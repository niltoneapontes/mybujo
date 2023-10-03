import { IItemRepository } from "../../interfaces/IItemRepository";

export default class ListItemsService {
  constructor(private itemRepository: IItemRepository) {}

  public async execute(user_id: string) {
    try {
      const itemsList = await this.itemRepository.findAllByUser(user_id);
      return itemsList;
    } catch (error) {
      throw new Error("Não foi possível listar os itens para esse usuário.");
    }
  }
}
