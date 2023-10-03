"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.itemSchema = new mongoose_1.default.Schema({
    userId: String,
    date: String,
    content: String,
    type: String,
});
