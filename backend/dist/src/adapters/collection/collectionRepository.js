"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRepository = void 0;
const collection_1 = require("../../domain/collection");
class CollectionRepository {
    async findAllByUser(userId) {
        return await collection_1.Collection.where({
            userId: userId,
        });
    }
    async findById(id) {
        return await collection_1.Collection.findById(id);
    }
    async save(collection) {
        const createCollection = new collection_1.Collection({
            userId: collection.userId,
            content: collection.content,
            title: collection.title,
        });
        createCollection.save();
        return collection;
    }
    async update(id, collection) {
        const foundCollection = await collection_1.Collection.updateOne({
            $where: id,
        }, {
            $set: {
                userId: collection.userId,
                content: collection.content,
                title: collection.title,
            },
        });
        return foundCollection;
    }
}
exports.CollectionRepository = CollectionRepository;
