"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mongodb_1 = __importDefault(require("@fastify/mongodb"));
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.get("/", (_request, reply) => {
    return reply.send({
        code: 200,
        message: "OK",
        body: {},
    });
});
async function dbConnector(fastify) {
    fastify
        .register(mongodb_1.default, {
        url: "mongodb://localhost:27017/mybujo",
    })
        .then((response) => {
        fastify.log.info("Connected to database");
    });
}
fastify.decorate("verifyJwt", () => {
    return {
        user: "Name",
        age: 31,
    };
});
fastify.addHook("onRequest", async () => {
    fastify.log.info("Got a request");
});
async function userRoutes(fastify) {
    fastify.post("/", {
        handler: async (request, reply) => {
            return reply.send({
                code: 201,
                message: "User Created",
                body: fastify.verifyJwt(),
            });
        },
    });
}
fastify.register(dbConnector);
fastify.register(userRoutes, {
    prefix: "/users",
});
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
