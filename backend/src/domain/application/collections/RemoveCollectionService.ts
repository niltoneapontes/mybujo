import { ICollectionRepository } from "../../interfaces/ICollectionRepository";

export default class RemoveCollectionService {
  constructor(private collectionRepository: ICollectionRepository) {}

  public async execute(id: string) {
    try {
      const collectionList = await this.collectionRepository.delete(id);
      return collectionList;
    } catch (error) {
      throw new Error("Não foi possível deletar a collection.");
    }
  }
}
