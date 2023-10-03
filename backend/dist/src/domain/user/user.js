"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.LoginProvider = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = require("../../adapters/infrastructure/database/userSchema");
var LoginProvider;
(function (LoginProvider) {
    LoginProvider["GOOGLE"] = "google";
    LoginProvider["APPLE"] = "apple";
    LoginProvider["FACEBOOK"] = "facebook";
    LoginProvider["MYBUJO"] = "mybujo";
})(LoginProvider || (exports.LoginProvider = LoginProvider = {}));
exports.User = mongoose_1.default.model("User", userSchema_1.userSchema);
