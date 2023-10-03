"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CollectionRepository_1 = require("../repositories/CollectionRepository");
const Collection_1 = require("../infrastructure/entities/Collection");
async function collectionController(fastify) {
    const collectionRepository = new CollectionRepository_1.CollectionRepository(Collection_1.Collection);
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
