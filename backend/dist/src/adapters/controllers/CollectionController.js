"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CollectionRepository_1 = require("../repositories/CollectionRepository");
const Collection_1 = require("../infrastructure/entities/Collection");
const CreateCollectionService_1 = __importDefault(require("../../../src/domain/application/collections/CreateCollectionService"));
const ListCollectionsService_1 = __importDefault(require("../../../src/domain/application/collections/ListCollectionsService"));
async function collectionController(fastify) {
    const createCollectionService = new CreateCollectionService_1.default(new CollectionRepository_1.CollectionRepository(Collection_1.Collection));
    const listCollectionsService = new ListCollectionsService_1.default(new CollectionRepository_1.CollectionRepository(Collection_1.Collection));
    fastify.post("/create", async (request, reply) => {
        try {
            const collection = await createCollectionService.execute({
                user_id: request.body.user_id,
                content: request.body.content,
                title: request.body.title,
            });
            return reply.status(200).send(collection);
        }
        catch (error) {
            return reply.status(500).send(error);
        }
    });
    fastify.get("/", async (request, reply) => {
        try {
            const collectionList = await listCollectionsService.execute(request.query.user_id);
            return reply.status(200).send(collectionList);
        }
        catch (error) {
            return reply.status(500).send(error);
        }
    });
}
exports.default = collectionController;
