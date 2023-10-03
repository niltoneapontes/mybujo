"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const itemSchema_1 = require("../database/itemSchema");
exports.Item = mongoose_1.default.model("Item", itemSchema_1.itemSchema);
