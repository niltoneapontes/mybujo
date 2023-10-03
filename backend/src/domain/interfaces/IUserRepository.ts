import { IUser } from "../models/IUser";

export interface IUserRepository {
  findByEmail(id: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser | null>;
  delete(user: IUser): Promise<IUser | null>;
}
