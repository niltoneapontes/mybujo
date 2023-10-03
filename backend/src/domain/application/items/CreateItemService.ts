import { ItemType } from "../../../../src/domain/models/IItem";
import { IItemRepository } from "../../interfaces/IItemRepository";

interface ICreateItemServiceDTO {
  user_id: string;
  content: string;
  date: string;
  type: ItemType;
}

export default class CreateItemService {
  constructor(private itemRepository: IItemRepository) {}

  public async execute(item: ICreateItemServiceDTO) {
    try {
      const newItem = await this.itemRepository.save({
        userId: item.user_id,
        content: item.content,
        date: item.date,
        type: item.type,
      });
      return newItem;
    } catch (error) {
      throw new Error("Não foi poss~ivel criar o item.");
    }
  }
}
