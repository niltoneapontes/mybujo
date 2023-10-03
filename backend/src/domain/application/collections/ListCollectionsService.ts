import { ICollectionRepository } from "../../interfaces/ICollectionRepository";

export default class ListCollectionsService {
  constructor(private collectionRepository: ICollectionRepository) {}

  public async execute(user_id: string) {
    try {
      const collectionList = await this.collectionRepository.findAllByUser(
        user_id
      );
      return collectionList;
    } catch (error) {
      throw new Error(
        "Não foi possível listar as collections para esse usuário."
      );
    }
  }
}
