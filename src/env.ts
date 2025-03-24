import { env as rawEnv } from "bun";
import z from "zod";

const listVariableSchema = z.union([z.string(), z.undefined()]).transform(
	(value: string | undefined): Set<string> =>
		new Set(
			value
				?.split(",")
				.map((item) => item.trim())
				.filter((item) => item.length > 0) ?? [],
		),
);

const envSchema = z
	.object({
		/**
		 * Email address of the Google Cloud service account used for the Google Drive API.
		 * The email must end with `@iam.gserviceaccount.com`.
		 */
		// biome-ignore lint/style/useNamingConvention:
		GOOGLE_SERVICE_ACCOUNT_EMAIL: z
			.string()
			.email()
			.endsWith("iam.gserviceaccount.com"),

		/**
		 * Private key of the Google Cloud service account used for the Google Drive API.
		 *
		 * The key must be a PEM-encoded string.
		 * Escaped newline characters (\n) will be replaced with actual newlines.
		 */
		// biome-ignore lint/style/useNamingConvention:
		GOOGLE_SERVICE_ACCOUNT_KEY: z
			.string()
			.startsWith(
				"-----BEGIN PRIVATE KEY-----",
				"The private key must be a PEM-encoded string.",
			)
			.endsWith(
				"-----END PRIVATE KEY-----",
				"The private key must be a PEM-encoded string.",
			)
			.transform((value) => value.replace(/\\n/g, "\n")),

		/**
		 * URL of the Discord webhook used to send notifications.
		 * The URL must start with `https://discord.com/api/webhooks/`.
		 *
		 * Set this to `null` to disable Discord notifications intentionally.
		 */
		// biome-ignore lint/style/useNamingConvention:
		DISCORD_WEBHOOK_URL: z
			.string()
			.url()
			.startsWith("https://discord.com/api/webhooks/")
			.or(z.literal("null").transform(() => undefined)),

		/**
		 * A list of email addresses allowed to transfer ownership of files to the service account.
		 *
		 * This restricts ownership transfers to specific users.
		 * If the list is empty, all users are allowed to transfer ownership.
		 *
		 * At least one of `USER_EMAILS_ALLOW_LIST` or `ROOT_FOLDERS_ALLOW_LIST` must be set;
		 * otherwise, anyone who knows the service account email can transfer ownership.
		 *
		 * Expected format: A comma-separated string of email addresses.
		 * Example: `user1@example.com,user2@example.com`
		 */
		// biome-ignore lint/style/useNamingConvention:
		USER_EMAILS_ALLOW_LIST: listVariableSchema.pipe(z.set(z.string().email())),

		/**
		 * A list of Google Drive folder IDs allowed as root folders for ownership transfer.
		 *
		 * This restricts ownership transfers to files within specific folders.
		 * If the list is empty, all files are allowed to be transferred.
		 *
		 * At least one of `USER_EMAILS_ALLOW_LIST` or `ROOT_FOLDERS_ALLOW_LIST` must be set;
		 * otherwise, anyone who knows the service account email can transfer ownership.
		 *
		 * Expected format: A comma-separated string of Google Drive folder IDs.
		 * Example: `folderId1,folderId2,folderId3`
		 */
		// biome-ignore lint/style/useNamingConvention:
		ROOT_FOLDERS_ALLOW_LIST: listVariableSchema.pipe(
			z.set(
				z
					.string()
					.nonempty()
					.regex(
						// ref: https://stackoverflow.com/questions/16840038/easiest-way-to-get-file-id-from-url-on-google-apps-script
						/^[a-zA-Z0-9_-]{33}$/,
						"Google Drive file ID must only contain alphanumeric characters, underscores, and hyphens.",
					),
			),
		),
	})
	.refine(
		({ USER_EMAILS_ALLOW_LIST, ROOT_FOLDERS_ALLOW_LIST }) =>
			USER_EMAILS_ALLOW_LIST.size > 0 || ROOT_FOLDERS_ALLOW_LIST.size > 0,
		"At least one of USER_EMAILS_ALLOW_LIST or ROOT_FOLDERS_ALLOW_LIST must be set.",
	);

export const env = envSchema.parse(rawEnv);
