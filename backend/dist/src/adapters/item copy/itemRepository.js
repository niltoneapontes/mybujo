"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
const item_1 = require("../../domain/item/item");
class ItemRepository {
    async findById(id) {
        return new item_1.Item({
            userId: "123456",
            content: "* Task",
            date: "01-02-03",
            type: item_1.ItemType.Daily,
        });
    }
    async save(item) {
        return new item_1.Item({
            userId: "123456",
            content: "* Task",
            date: "01-02-03",
            type: item_1.ItemType.Daily,
        });
    }
}
exports.ItemRepository = ItemRepository;
