"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCollectionService {
    collectionRepository;
    constructor(collectionRepository) {
        this.collectionRepository = collectionRepository;
    }
    async execute(request) {
        try {
            const newCollection = await this.collectionRepository.save({
                userId: request.user_id,
                content: request.content,
                title: request.title,
            });
            return newCollection;
        }
        catch (error) {
            throw new Error("Não foi possível criar a collection.");
        }
    }
}
exports.default = CreateCollectionService;
