"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ItemRepository_1 = require("../repositories/ItemRepository");
const Item_1 = require("../infrastructure/entities/Item");
const IItem_1 = require("../../domain/models/IItem");
async function itemController(fastify) {
    const itemRepository = new ItemRepository_1.ItemRepository(Item_1.Item);
    fastify.post("/create", async (request, reply) => {
        try {
            const newItem = await itemRepository.save({
                userId: request.body.user_id,
                content: request.body.content,
                date: Date.now().toString(),
                type: IItem_1.ItemType.Daily,
            });
            return reply.status(201).send(newItem);
        }
        catch (error) {
            return reply.status(500).send({ message: error });
        }
    });
    fastify.get("/", async (request, reply) => {
        try {
            const itemsList = await itemRepository.findAllByUser(request.query.user_id);
            return reply.status(200).send(itemsList);
        }
        catch (error) {
            return reply.status(500).send(error);
        }
    });
}
exports.default = itemController;
