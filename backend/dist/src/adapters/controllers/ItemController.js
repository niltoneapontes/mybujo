"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemRepository_1 = require("../repositories/ItemRepository");
const Item_1 = require("../infrastructure/entities/Item");
const CreateItemService_1 = __importDefault(require("../../../src/domain/application/items/CreateItemService"));
const ListItemsService_1 = __importDefault(require("../../../src/domain/application/items/ListItemsService"));
const IItem_1 = require("../../../src/domain/models/IItem");
async function itemController(fastify) {
    const createItemService = new CreateItemService_1.default(new ItemRepository_1.ItemRepository(Item_1.Item));
    const listItemsService = new ListItemsService_1.default(new ItemRepository_1.ItemRepository(Item_1.Item));
    fastify.post("/create", async (request, reply) => {
        try {
            const item = await createItemService.execute({
                user_id: request.body.user_id,
                content: request.body.content,
                date: Date.now().toString(),
                type: IItem_1.ItemType.Daily,
            });
            return reply.status(200).send(item);
        }
        catch (error) {
            return reply.status(500).send(error);
        }
    });
    fastify.get("/", async (request, reply) => {
        try {
            const item = await listItemsService.execute(request.query.user_id);
            return reply.status(200).send(item);
        }
        catch (error) {
            return reply.status(500).send(error);
        }
    });
}
exports.default = itemController;
