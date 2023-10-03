"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListItemsService {
    itemRepository;
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async execute(user_id) {
        try {
            const itemsList = await this.itemRepository.findAllByUser(user_id);
            return itemsList;
        }
        catch (error) {
            throw new Error("Não foi possível listar os itens para esse usuário.");
        }
    }
}
exports.default = ListItemsService;
