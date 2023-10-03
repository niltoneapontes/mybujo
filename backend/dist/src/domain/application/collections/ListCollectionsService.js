"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListCollectionsService {
    collectionRepository;
    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }
    async execute(user_id) {
        try {
            const collectionList = await this.collectionRepository.findAllByUser(user_id);
            return collectionList;
        }
        catch (error) {
            throw new Error("Não foi possível listar as collections para esse usuário.");
        }
    }
}
exports.default = ListCollectionsService;
