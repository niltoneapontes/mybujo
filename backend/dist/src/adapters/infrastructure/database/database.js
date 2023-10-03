"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connect(fastify) {
    try {
        await mongoose_1.default.connect(process.env.NODE_ENV_MONGO_PASSWORD ||
            "mongodb+srv://nilton:<password>@cluster0.j2mrx.mongodb.net/?retryWrites=true&w=majority");
    }
    catch (error) {
        fastify.log.error({
            message: "Could not connect to database",
            details: error,
            connectUrl: process.env.NODE_ENV_MONGO_PASSWORD,
        });
    }
}
exports.connect = connect;
