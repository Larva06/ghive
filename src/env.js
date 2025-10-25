"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var bun_1 = require("bun");
var zod_1 = require("zod");
var listVariableSchema = zod_1.default.union([zod_1.default.string(), zod_1.default.undefined()]).transform(function (value) {
    var _a;
    return new Set((_a = value === null || value === void 0 ? void 0 : value.split(",").map(function (item) { return item.trim(); }).filter(function (item) { return item.length > 0; })) !== null && _a !== void 0 ? _a : []);
});
var envSchema = zod_1.default
    .object({
    // biome-ignore-start lint/style/useNamingConvention: env vars
    /**
     * URL of the Discord webhook used to send notifications.
     * The URL must start with `https://discord.com/api/webhooks/`.
     *
     * Set this to `null` to disable Discord notifications intentionally.
     */
    DISCORD_WEBHOOK_URL: zod_1.default
        .url()
        .startsWith("https://discord.com/api/webhooks/")
        .or(zod_1.default
        .literal("null")
        // biome-ignore lint/nursery/noUselessUndefined: this is intentional
        .transform(function () { return undefined; })),
    /**
     * Email address of the Google Cloud service account used for the Google Drive API.
     * The email must end with `@iam.gserviceaccount.com`.
     */
    GOOGLE_SERVICE_ACCOUNT_EMAIL: zod_1.default.email().endsWith("iam.gserviceaccount.com"),
    /**
     * Private key of the Google Cloud service account used for the Google Drive API.
     *
     * The key must be a PEM-encoded string.
     * Escaped newline characters (\n) will be replaced with actual newlines.
     */
    GOOGLE_SERVICE_ACCOUNT_KEY: zod_1.default
        .string()
        .startsWith("-----BEGIN PRIVATE KEY-----", "The private key must be a PEM-encoded string.")
        .endsWith("-----END PRIVATE KEY-----", "The private key must be a PEM-encoded string.")
        .transform(function (value) { return value.replace(/\\n/g, "\n"); }),
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
    ROOT_FOLDERS_ALLOW_LIST: listVariableSchema.pipe(zod_1.default.set(zod_1.default
        .string()
        .nonempty()
        .regex(
    // ref: https://stackoverflow.com/questions/16840038/easiest-way-to-get-file-id-from-url-on-google-apps-script
    /^[a-zA-Z0-9_-]{33}$/, "Google Drive file ID must only contain alphanumeric characters, underscores, and hyphens."))),
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
    USER_EMAILS_ALLOW_LIST: listVariableSchema.pipe(zod_1.default.set(zod_1.default.email())),
    // biome-ignore-end lint/style/useNamingConvention: env vars
})
    .refine(function (_a) {
    var USER_EMAILS_ALLOW_LIST = _a.USER_EMAILS_ALLOW_LIST, ROOT_FOLDERS_ALLOW_LIST = _a.ROOT_FOLDERS_ALLOW_LIST;
    return USER_EMAILS_ALLOW_LIST.size > 0 || ROOT_FOLDERS_ALLOW_LIST.size > 0;
}, "At least one of USER_EMAILS_ALLOW_LIST or ROOT_FOLDERS_ALLOW_LIST must be set.");
exports.env = envSchema.parse(bun_1.env);
