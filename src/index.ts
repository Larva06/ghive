import { auth, drive_v3 } from "@googleapis/drive";
import { sendTransferNotification } from "./discord.ts";
import { env } from "./env.ts";

const lazyInit = <T>(fn: () => T): (() => T) => {
	let prom: T | undefined;
	return (): T =>
		// biome-ignore lint/suspicious/noAssignInExpressions: sideeffect is intentional
		(prom = prom || fn());
};

const driveClient = new drive_v3.Drive({
	auth: new auth.GoogleAuth({
		credentials: {
			// biome-ignore lint/style/useNamingConvention:
			client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			// biome-ignore lint/style/useNamingConvention:
			private_key: env.GOOGLE_SERVICE_ACCOUNT_KEY,
		},
		// ref: https://developers.google.com/identity/protocols/oauth2/scopes#drive
		scopes: [
			// drive.file should be enough from the docs, but ownership transfer throws an error
			"https://www.googleapis.com/auth/drive",
		],
	}),
});

/**
 * Retrieves all files from Google Drive using the `files.list` method.
 * @param listParams The parameters to pass to the `files.list` method.
 * @returns An async generator that yields files from the Google Drive API.
 */
async function* retrieveAllFiles(
	listParams: drive_v3.Params$Resource$Files$List,
): AsyncGenerator<drive_v3.Schema$File> {
	let pageToken: string | undefined;
	do {
		const response = await driveClient.files.list({
			...listParams,
			fields: `${listParams.fields}, nextPageToken`,
			...(pageToken ? { pageToken } : {}),
		});
		const files = response.data.files ?? [];
		yield* files;
		pageToken = response.data.nextPageToken ?? undefined;
		console.info(
			`Retrieved ${files.length} files. ${pageToken ? "Continuing..." : "Done."}`,
		);
	} while (pageToken);
}

/**
 * Recursively retrieves all allowed folders from Google Drive.
 * @returns A set of folder IDs
 */
const retrieveAllowedFolders = async (): Promise<Set<string>> => {
	if (env.ROOT_FOLDERS_ALLOW_LIST.size === 0) {
		return new Set<string>();
	}

	const folderChildrenMap = new Map<string, string[]>();
	// retrieve all folders first to avoid rate limit errors
	for await (const folder of retrieveAllFiles({
		fields: "files(id, parents)",
		q: `trashed = false and mimeType = 'application/vnd.google-apps.folder'`,
	})) {
		if (!folder.id) {
			continue;
		}
		for (const parent of folder.parents ?? []) {
			if (!folderChildrenMap.has(parent)) {
				folderChildrenMap.set(parent, []);
			}
			folderChildrenMap.get(parent)?.push(folder.id);
		}
	}

	const allowedFolders = new Set<string>();
	const queue = [...env.ROOT_FOLDERS_ALLOW_LIST];
	// BFS to find all allowed folders
	while (queue.length > 0) {
		// biome-ignore lint/style/noNonNullAssertion: queue must not be empty
		const currentId = queue.shift()!;
		if (allowedFolders.has(currentId)) {
			continue;
		}
		allowedFolders.add(currentId);
		queue.push(
			...(folderChildrenMap
				.get(currentId)
				?.filter((child) => !allowedFolders.has(child)) ?? []),
		);
	}
	return allowedFolders;
};

const main = async (): Promise<void> => {
	// filter files by owner if USER_EMAILS_ALLOW_LIST is set
	const ownerQuery =
		env.USER_EMAILS_ALLOW_LIST.size === 0
			? ` and (${[
					...env.USER_EMAILS_ALLOW_LIST.values().map(
						(email) => ` '${email}' in owners`,
					),
				].join(" or ")})`
			: "";

	const allowedFolders = lazyInit(retrieveAllowedFolders);

	for await (const file of retrieveAllFiles({
		fields:
			"files(id, name, webViewLink, parents, permissions(id, displayName, emailAddress, role, pendingOwner))",
		// exclude folders because there's no need to transfer ownership of folders
		q: `trashed = false and mimeType != 'application/vnd.google-apps.folder'${ownerQuery}`,
	})) {
		if (!(file.id && file.permissions)) {
			continue;
		}
		const pendingOwnerPermission = file.permissions.find(
			(permission) =>
				permission.pendingOwner &&
				permission.emailAddress === env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		);
		if (!pendingOwnerPermission?.id) {
			continue;
		}

		const previousOwner = file.permissions.find(
			(permission) => permission.role === "owner",
		);

		if (
			!file.parents?.some(async (parent) =>
				(await allowedFolders()).has(parent),
			)
		) {
			continue;
		}

		await driveClient.permissions.update({
			fileId: file.id,
			permissionId: pendingOwnerPermission.id,
			transferOwnership: true,
			requestBody: {
				role: "owner",
			},
		});
		// Do not print file info to the console because GitHub Actions logs are public
		console.info("Transferred ownership of a file.");
		await sendTransferNotification({
			file: {
				name: file.name ?? undefined,
				url: file.webViewLink ?? undefined,
			},
			previousOwner: {
				name: previousOwner?.displayName ?? undefined,
				email: previousOwner?.emailAddress ?? undefined,
			},
		});
	}
};

await main();
