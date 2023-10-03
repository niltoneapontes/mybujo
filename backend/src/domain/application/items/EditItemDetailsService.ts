import { IItem } from "../../../../src/domain/models/IItem";
import { IItemRepository } from "../../interfaces/IItemRepository";

export default class EditItemDetailsService {
  constructor(private itemRepository: IItemRepository) {}

  public async execute(id: string, editedItem: Omit<IItem, "userId">) {
    try {
      const item = await this.itemRepository.findById(id);
      if (!item) return null;
      const newItem = await this.itemRepository.update(id, editedItem);
      return newItem;
    } catch (error) {
      throw new Error("Não foi possível listar os itens para esse usuário.");
    }
  }
}
