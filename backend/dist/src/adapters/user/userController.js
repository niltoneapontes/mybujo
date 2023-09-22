"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function userController(fastify) {
    fastify.post("/", {
        handler: async (request, reply) => {
            return reply.send({
                code: 201,
                message: "User Created",
                body: fastify.verifyJwt(),
            });
        },
    });
    fastify.get("/", (request, reply) => {
        reply.send({ user: "Joao" });
    });
}
exports.default = userController;
