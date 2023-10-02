import { Collection, ICollection } from "../../domain/collection";

export interface ICollectionRepository {
  findAllByUser(userId: string): Promise<ICollection[] | null>;
  findById(id: string): Promise<any>;
  save(user: ICollection): Promise<any>;
  update(id: string, collection: ICollection): Promise<ICollection | null>;
}

export class CollectionRepository implements ICollectionRepository {
  async findAllByUser(userId: string): Promise<any> {
    return await Collection.where({
      userId: userId,
    });
  }

  async findById(id: string): Promise<any> {
    return await Collection.findById(id);
  }

  async save(collection: ICollection): Promise<any> {
    const createCollection = new Collection({
      userId: collection.userId,
      content: collection.content,
      title: collection.title,
    });
    createCollection.save();
    return collection;
  }

  async update(id: string, collection: ICollection): Promise<any> {
    const foundCollection = await Collection.updateOne(
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
}
