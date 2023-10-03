"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectionRepository_1 = require("./collectionRepository");
async function collectionController(fastify) {
    const collectionRepository = new collectionRepository_1.CollectionRepository();
    fastify.post("/create", async (request, reply) => {
        try {
            const newCollection = await collectionRepository.save({
                userId: request.body.user_id,
                content: request.body.content,
                title: request.body.title,
            });
            return reply.status(201).send(newCollection);
        }
        catch (error) {
            return reply.status(500).send({ message: error });
        }
    });
    fastify.get("/", async (request, reply) => {
        try {
            const collectionList = await collectionRepository.findAllByUser(request.query.user_id);
            return reply.status(200).send(collectionList);
        }
        catch (error) {
            return reply.status(500).send(error);
        }
    });
}
exports.default = collectionController;
