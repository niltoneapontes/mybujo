import { ICollection } from "../models/ICollection";

export interface ICollectionRepository {
  findAllByUser(userId: string): Promise<ICollection[] | null>;
  findById(id: string): Promise<any>;
  save(user: ICollection): Promise<any>;
  update(id: string, collection: ICollection): Promise<ICollection | null>;
  delete(id: string): Promise<ICollection | null>;
}
