"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
// biome-ignore-all lint/suspicious/noConsole: allow console logs in index.ts
var drive_1 = require("@googleapis/drive");
var discord_ts_1 = require("./discord.ts");
var env_ts_1 = require("./env.ts");
var lazyInit = function (fn) {
    var prom;
    return function () {
        // biome-ignore lint/suspicious/noAssignInExpressions: sideeffect is intentional
        return (prom = prom || fn());
    };
};
var driveClient = new drive_1.drive_v3.Drive({
    auth: new drive_1.auth.GoogleAuth({
        credentials: {
            // biome-ignore-start lint/style/useNamingConvention: follow Google API naming convention
            client_email: env_ts_1.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: env_ts_1.env.GOOGLE_SERVICE_ACCOUNT_KEY,
            // biome-ignore-end lint/style/useNamingConvention: follow Google API naming convention
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
function retrieveAllFiles(listParams) {
    return __asyncGenerator(this, arguments, function retrieveAllFiles_1() {
        var pageToken, response, files;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, __await(driveClient.files.list(__assign(__assign(__assign({}, listParams), { fields: "".concat(listParams.fields, ", nextPageToken") }), (pageToken ? { pageToken: pageToken } : {}))))];
                case 1:
                    response = _c.sent();
                    files = (_a = response.data.files) !== null && _a !== void 0 ? _a : [];
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(files)))];
                case 2: return [4 /*yield*/, __await.apply(void 0, [_c.sent()])];
                case 3:
                    _c.sent();
                    pageToken = (_b = response.data.nextPageToken) !== null && _b !== void 0 ? _b : undefined;
                    console.info("Retrieved ".concat(files.length, " files. ").concat(pageToken ? "Continuing..." : "Done."));
                    _c.label = 4;
                case 4:
                    if (pageToken) return [3 /*break*/, 0];
                    _c.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Recursively retrieves all allowed folders from Google Drive.
 * @returns A set of folder IDs
 */
var retrieveAllowedFolders = function () { return __awaiter(void 0, void 0, void 0, function () {
    var folderChildrenMap, _a, _b, _c, folder, _i, _d, parent_1, e_1_1, allowedFolders, queue, currentId;
    var _e, e_1, _f, _g;
    var _h, _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                if (env_ts_1.env.ROOT_FOLDERS_ALLOW_LIST.size === 0) {
                    return [2 /*return*/, new Set()];
                }
                folderChildrenMap = new Map();
                _m.label = 1;
            case 1:
                _m.trys.push([1, 6, 7, 12]);
                _a = true, _b = __asyncValues(retrieveAllFiles({
                    fields: "files(id, parents)",
                    q: "trashed = false and mimeType = 'application/vnd.google-apps.folder'",
                }));
                _m.label = 2;
            case 2: return [4 /*yield*/, _b.next()];
            case 3:
                if (!(_c = _m.sent(), _e = _c.done, !_e)) return [3 /*break*/, 5];
                _g = _c.value;
                _a = false;
                folder = _g;
                if (!folder.id) {
                    return [3 /*break*/, 4];
                }
                for (_i = 0, _d = (_h = folder.parents) !== null && _h !== void 0 ? _h : []; _i < _d.length; _i++) {
                    parent_1 = _d[_i];
                    if (!folderChildrenMap.has(parent_1)) {
                        folderChildrenMap.set(parent_1, []);
                    }
                    (_j = folderChildrenMap.get(parent_1)) === null || _j === void 0 ? void 0 : _j.push(folder.id);
                }
                _m.label = 4;
            case 4:
                _a = true;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _m.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _m.trys.push([7, , 10, 11]);
                if (!(!_a && !_e && (_f = _b.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _f.call(_b)];
            case 8:
                _m.sent();
                _m.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12:
                allowedFolders = new Set();
                queue = __spreadArray([], env_ts_1.env.ROOT_FOLDERS_ALLOW_LIST, true);
                // BFS to find all allowed folders
                while (queue.length > 0) {
                    currentId = queue.shift();
                    if (allowedFolders.has(currentId)) {
                        continue;
                    }
                    allowedFolders.add(currentId);
                    queue.push.apply(queue, ((_l = (_k = folderChildrenMap
                        .get(currentId)) === null || _k === void 0 ? void 0 : _k.filter(function (child) { return !allowedFolders.has(child); })) !== null && _l !== void 0 ? _l : []));
                }
                return [2 /*return*/, allowedFolders];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ownerQuery, allowedFolders, _a, _b, _c, file, pendingOwnerPermission, previousOwner, e_2_1;
    var _d, e_2, _e, _f;
    var _g, _h, _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                ownerQuery = env_ts_1.env.USER_EMAILS_ALLOW_LIST.size === 0
                    ? " and (".concat(__spreadArray([], env_ts_1.env.USER_EMAILS_ALLOW_LIST.values().map(function (email) { return " '".concat(email, "' in owners"); }), true).join(" or "), ")")
                    : "";
                allowedFolders = lazyInit(retrieveAllowedFolders);
                _m.label = 1;
            case 1:
                _m.trys.push([1, 8, 9, 14]);
                _a = true, _b = __asyncValues(retrieveAllFiles({
                    fields: "files(id, name, webViewLink, parents, permissions(id, displayName, emailAddress, role, pendingOwner))",
                    // exclude folders because there's no need to transfer ownership of folders
                    q: "trashed = false and mimeType != 'application/vnd.google-apps.folder'".concat(ownerQuery),
                }));
                _m.label = 2;
            case 2: return [4 /*yield*/, _b.next()];
            case 3:
                if (!(_c = _m.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                _f = _c.value;
                _a = false;
                file = _f;
                if (!(file.id && file.permissions)) {
                    return [3 /*break*/, 6];
                }
                pendingOwnerPermission = file.permissions.find(function (permission) {
                    return permission.pendingOwner &&
                        permission.emailAddress === env_ts_1.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
                });
                if (!(pendingOwnerPermission === null || pendingOwnerPermission === void 0 ? void 0 : pendingOwnerPermission.id)) {
                    return [3 /*break*/, 6];
                }
                previousOwner = file.permissions.find(function (permission) { return permission.role === "owner"; });
                if (!((_g = file.parents) === null || _g === void 0 ? void 0 : _g.some(function (parent) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, allowedFolders()];
                        case 1: return [2 /*return*/, (_a.sent()).has(parent)];
                    }
                }); }); }))) {
                    return [3 /*break*/, 6];
                }
                return [4 /*yield*/, driveClient.permissions.update({
                        fileId: file.id,
                        permissionId: pendingOwnerPermission.id,
                        requestBody: {
                            role: "owner",
                        },
                        transferOwnership: true,
                    })];
            case 4:
                _m.sent();
                // Do not print file info to the console because GitHub Actions logs are public
                console.info("Transferred ownership of a file.");
                return [4 /*yield*/, (0, discord_ts_1.sendTransferNotification)({
                        file: {
                            name: (_h = file.name) !== null && _h !== void 0 ? _h : undefined,
                            url: (_j = file.webViewLink) !== null && _j !== void 0 ? _j : undefined,
                        },
                        previousOwner: {
                            email: (_k = previousOwner === null || previousOwner === void 0 ? void 0 : previousOwner.emailAddress) !== null && _k !== void 0 ? _k : undefined,
                            name: (_l = previousOwner === null || previousOwner === void 0 ? void 0 : previousOwner.displayName) !== null && _l !== void 0 ? _l : undefined,
                        },
                    })];
            case 5:
                _m.sent();
                _m.label = 6;
            case 6:
                _a = true;
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_2_1 = _m.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 14];
            case 9:
                _m.trys.push([9, , 12, 13]);
                if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 11];
                return [4 /*yield*/, _e.call(_b)];
            case 10:
                _m.sent();
                _m.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}); };
await main();
