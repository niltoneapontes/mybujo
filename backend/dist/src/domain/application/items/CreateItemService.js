"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateItemService {
    itemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(item) {
        try {
            const newItem = await this.itemRepository.save({
                userId: item.user_id,
                content: item.content,
                date: item.date,
                type: item.type,
            });
            return newItem;
        }
        catch (error) {
            throw new Error("Não foi poss~ivel criar o item.");
        }
    }
}
exports.default = CreateItemService;
