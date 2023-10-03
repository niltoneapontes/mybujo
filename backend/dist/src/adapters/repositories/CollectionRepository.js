"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRepository = void 0;
class CollectionRepository {
    Collection;
    constructor(Collection) {
        this.Collection = Collection;
    }
    async findAllByUser(userId) {
        return await this.Collection.where({
            userId: userId,
        });
    }
    async findById(id) {
        return await this.Collection.findById(id);
    }
    async save(collection) {
        const createCollection = new this.Collection({
            userId: collection.userId,
            content: collection.content,
            title: collection.title,
        });
        createCollection.save();
        return collection;
    }
    async update(id, collection) {
        const foundCollection = await this.Collection.updateOne({
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
    async delete(id) {
        const deletedCollection = await this.Collection.findByIdAndDelete(id);
        return deletedCollection;
    }
}
exports.CollectionRepository = CollectionRepository;
