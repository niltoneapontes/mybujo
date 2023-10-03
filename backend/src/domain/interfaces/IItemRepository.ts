import { IItem } from "../models/IItem";

export interface IItemRepository {
  findAllByUser(userId: string): Promise<IItem[] | null>;
  findById(id: string): Promise<IItem | null>;
  save(item: IItem): Promise<IItem | null>;
  update(id: string, item: Omit<IItem, "userId">): Promise<IItem | null>;
}
