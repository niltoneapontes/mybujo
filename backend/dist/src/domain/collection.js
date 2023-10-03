"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collectionSchema_1 = require("../adapters/infrastructure/database/collectionSchema");
exports.Collection = mongoose_1.default.model("Collection", collectionSchema_1.collectionSchema);
