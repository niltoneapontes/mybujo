import mongoose from "mongoose";
import { IItem } from "../../domain/models/IItem";
import { IItemRepository } from "src/domain/interfaces/IItemRepository";

export class ItemRepository implements IItemRepository {
  constructor(private Item: mongoose.Model<any>) {}

  async findAllByUser(userId: string): Promise<any> {
    console.log(userId);
    return await this.Item.where({
      userId: userId,
    });
  }

  async findById(id: string): Promise<any> {
    return await this.Item.findById(id);
  }

  async save(item: IItem): Promise<any> {
    const createItem = new this.Item({
      userId: item.userId,
      content: item.content,
      date: item.date,
      type: item.type,
    });
    createItem.save();
    return item;
  }

  async update(id: string, item: IItem): Promise<any> {
    const foundItem = await this.Item.updateOne(
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
