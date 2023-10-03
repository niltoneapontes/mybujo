"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
const Item_1 = require("../../domain/item/Item");
class ItemRepository {
    async findAllByUser(userId) {
        console.log(userId);
        return await Item_1.Item.where({
            userId: userId,
        });
    }
    async findById(id) {
        return await Item_1.Item.findById(id);
    }
    async save(item) {
        const createItem = new Item_1.Item({
            userId: item.userId,
            content: item.content,
            date: item.date,
            type: item.type,
        });
        createItem.save();
        return item;
    }
    async update(id, item) {
        const foundItem = await Item_1.Item.updateOne({
            $where: id,
        }, {
            $set: {
                userId: item.userId,
                content: item.content,
                date: item.date,
                type: item.type,
            },
        });
        return foundItem;
    }
}
exports.ItemRepository = ItemRepository;
