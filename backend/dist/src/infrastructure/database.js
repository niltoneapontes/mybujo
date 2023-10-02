"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnector = void 0;
const mongodb_1 = __importDefault(require("@fastify/mongodb"));
async function dbConnector(fastify) {
    fastify
        .register(mongodb_1.default, {
        name: "mongo",
        url: "mongodb://localhost:27017/",
        forceClose: true,
    })
        .then((_) => {
        fastify.log.info("Connected to database");
    });
}
exports.dbConnector = dbConnector;
