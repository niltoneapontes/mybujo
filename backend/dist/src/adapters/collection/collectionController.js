"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("../../domain/collection");
async function collectionController(fastify) {
    fastify.get("/all", async (request, reply) => {
        try {
            const collection = new collection_1.Collection({
                userId: "123456",
                title: "Idk",
                content: "* Task",
            });
            collection.save();
            reply.send({ message: "created collection" });
        }
        catch (error) {
            reply.status(500).send({ message: error });
        }
    });
}
exports.default = collectionController;
