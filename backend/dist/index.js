"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const oauth_1 = require("./src/adapters/infrastructure/oauth");
const UserController_1 = __importDefault(require("./src/adapters/controllers/UserController"));
const database_1 = require("./src/adapters/infrastructure/database/database");
const ItemController_1 = __importDefault(require("./src/adapters/controllers/ItemController"));
const CollectionController_1 = __importDefault(require("./src/adapters/controllers/CollectionController"));
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.addHook("onRequest", async () => {
    fastify.log.info("Incomming request");
});
fastify.register(UserController_1.default, {
    prefix: "/users",
});
fastify.register(ItemController_1.default, {
    prefix: "/items",
});
fastify.register(CollectionController_1.default, {
    prefix: "/collections",
});
fastify.register(oauth_1.oAuthGoogle);
fastify.ready();
(0, database_1.connect)(fastify);
fastify.listen({
    port: 3000,
}, (err, address) => {
    if (err) {
        fastify.log.error("Server failed to start. Error: ", err);
        process.exit(1);
    }
    fastify.log.info("Server running at port 3000");
    fastify.log.info(address);
});
