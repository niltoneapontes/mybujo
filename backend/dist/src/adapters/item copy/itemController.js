"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../../domain/item/item");
async function itemController(fastify) {
    fastify.get("/all", async (request, reply) => {
        try {
            const item = new item_1.Item({
                userId: "123456",
                content: "* Task",
                date: "01-02-03",
                type: item_1.ItemType.Daily,
            });
            item.save();
            reply.send({ message: "created item" });
        }
        catch (error) {
            reply.status(500).send({ message: error });
        }
    });
}
exports.default = itemController;
