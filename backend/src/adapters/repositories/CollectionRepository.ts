import mongoose from "mongoose";
import { ICollection } from "../../domain/models/ICollection";
import { ICollectionRepository } from "src/domain/interfaces/ICollectionRepository";

export class CollectionRepository implements ICollectionRepository {
  constructor(private Collection: mongoose.Model<any>) {}

  async findAllByUser(userId: string): Promise<any> {
    return await this.Collection.where({
      userId: userId,
    });
  }

  async findById(id: string): Promise<any> {
    return await this.Collection.findById(id);
  }

  async save(collection: ICollection): Promise<any> {
    const createCollection = new this.Collection({
      userId: collection.userId,
      content: collection.content,
      title: collection.title,
    });
    createCollection.save();
    return collection;
  }

  async update(id: string, collection: ICollection): Promise<any> {
    const foundCollection = await this.Collection.updateOne(
      {
        $where: id,
      },
      {
        $set: {
          userId: collection.userId,
          content: collection.content,
          title: collection.title,
        },
      }
    );
    return foundCollection;
  }

  async delete(id: string): Promise<any> {
    const deletedCollection = await this.Collection.findByIdAndDelete(id);
    return deletedCollection;
  }
}
