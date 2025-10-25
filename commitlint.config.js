"use strict";
// ref: https://commitlint.js.org/reference/configuration.html
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
Object.defineProperty(exports, "__esModule", { value: true });
var config_conventional_1 = require("@commitlint/config-conventional");
var excludeQuestions = [
    // exclude isBreaking, breaking, and breakingBody because this package does not have versioning
    "isBreaking",
    "breaking",
    "breakingBody",
    // exclude isIssueAffected, issuesBody, and issues because I link branches to issues using GitHub
    "isIssueAffected",
    "issuesBody",
    "issues",
];
var commitlintConfig = __assign(__assign({}, config_conventional_1.default), { prompt: __assign(__assign({}, config_conventional_1.default.prompt), { questions: Object.fromEntries(Object.entries(config_conventional_1.default.prompt.questions).filter(function (_a) {
            var key = _a[0];
            return !excludeQuestions.includes(key);
        })) }) });
exports.default = commitlintConfig;
