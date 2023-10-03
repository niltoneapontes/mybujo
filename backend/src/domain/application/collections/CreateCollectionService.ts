import { ICollectionRepository } from "../../interfaces/ICollectionRepository";

interface ICreateCollectionDTO {
  user_id: string;
  content: string;
  title: string;
}

export default class CreateCollectionService {
  constructor(private collectionRepository: ICollectionRepository) {}

  public async execute(request: ICreateCollectionDTO) {
    try {
      const newCollection = await this.collectionRepository.save({
        userId: request.user_id,
        content: request.content,
        title: request.title,
      });
      return newCollection;
    } catch (error) {
      throw new Error("Não foi possível criar a collection.");
    }
  }
}
