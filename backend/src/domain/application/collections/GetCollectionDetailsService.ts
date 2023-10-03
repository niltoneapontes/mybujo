import { ICollectionRepository } from "../../interfaces/ICollectionRepository";

export default class GetCollectionDetailsService {
  constructor(private collectionRepository: ICollectionRepository) {}

  public async execute(id: string) {
    try {
      const collectionList = await this.collectionRepository.findById(id);
      return collectionList;
    } catch (error) {
      throw new Error("Não foi possível buscar os detalhes dessa collection.");
    }
  }
}
