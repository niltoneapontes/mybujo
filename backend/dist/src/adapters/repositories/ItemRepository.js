"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
class ItemRepository {
    Item;
    constructor(Item) {
        this.Item = Item;
    }
    async findAllByUser(userId) {
        console.log(userId);
        return await this.Item.where({
            userId: userId,
        });
    }
    async findById(id) {
        return await this.Item.findById(id);
    }
    async save(item) {
        const createItem = new this.Item({
            userId: item.userId,
            content: item.content,
            date: item.date,
            type: item.type,
        });
        createItem.save();
        return item;
    }
    async update(id, item) {
        const foundItem = await this.Item.updateOne({
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
