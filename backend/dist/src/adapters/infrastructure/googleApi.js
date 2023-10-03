"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleApi = void 0;
const axios_1 = __importDefault(require("axios"));
exports.googleApi = axios_1.default.create({
    baseURL: "https://www.googleapis.com/oauth2/v1",
});
