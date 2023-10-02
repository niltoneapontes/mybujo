"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function itemController(fastify) {
    fastify.get("/all", async (request, reply) => {
        try {
            reply.send({ message: "created item" });
        }
        catch (error) {
            reply.status(500).send({ message: error });
        }
    });
}
exports.default = itemController;
