import { IItem, Item } from "../../domain/item";

export interface IItemRepository {
  findAllByUser(userId: string): Promise<IItem[] | null>;
  findById(id: string): Promise<IItem | null>;
  save(item: IItem): Promise<IItem | null>;
  update(id: string, item: IItem): Promise<IItem | null>;
}

export class ItemRepository implements IItemRepository {
  async findAllByUser(userId: string): Promise<any> {
    return await Item.where({
      userId: userId,
    });
  }

  async findById(id: string): Promise<any> {
    return await Item.findById(id);
  }

  async save(item: IItem): Promise<any> {
    const createItem = new Item({
      userId: item.userId,
      content: item.content,
      date: item.date,
      type: item.type,
    });
    createItem.save();
    return item;
  }

  async update(id: string, item: IItem): Promise<any> {
    const foundItem = await Item.updateOne(
      {
        $where: id,
      },
      {
        $set: {
          userId: item.userId,
          content: item.content,
          date: item.date,
          type: item.type,
        },
      }
    );
    return foundItem;
  }
}
