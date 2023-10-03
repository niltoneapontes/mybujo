import { ICollection } from "../../../../src/domain/models/ICollection";
import { ICollectionRepository } from "../../interfaces/ICollectionRepository";

export default class EditCollectionDetailsService {
  constructor(private collectionRepository: ICollectionRepository) {}

  public async execute(
    id: string,
    editedCollection: Omit<ICollection, "userId">
  ) {
    try {
      const collection = await this.collectionRepository.findById(id);
      if (collection) {
        const newCollection = await this.collectionRepository.update(
          id,
          editedCollection
        );
        return newCollection;
      }
    } catch (error) {
      throw new Error("Não foi possível editar essa collection.");
    }
  }
}
