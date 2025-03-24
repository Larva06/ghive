import { EmbedBuilder } from "@discordjs/builders";
import { WebhookClient } from "discord.js";
import { env } from "./env.ts";

const webhookClient = env.DISCORD_WEBHOOK_URL
	? new WebhookClient({
			url: env.DISCORD_WEBHOOK_URL,
		})
	: undefined;

export const sendTransferNotification = async ({
	file,
	previousOwner,
}: {
	file: {
		name: string | undefined;
		url: string | undefined;
	};
	previousOwner: {
		name: string | undefined;
		email: string | undefined;
	};
}): Promise<void> => {
	await webhookClient?.send({
		embeds: [
			new EmbedBuilder()
				.setTitle("ghive")
				.setDescription(
					`Transferred ownership of ${
						file.name ? `[${file.name}](${file.url})` : file.url
					} from ${
						previousOwner.name
							? `${previousOwner.name} (${previousOwner.email})`
							: previousOwner.email
					}`,
				)
				.setColor(0xfff42b)
				.setFooter({
					text: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
				})
				.toJSON(),
		],
	});
};
