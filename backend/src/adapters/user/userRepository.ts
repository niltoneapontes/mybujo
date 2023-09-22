import { User } from "src/domain/user";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    return new User("1", "niltoneapontes@gmail.com", "Nilton", "none");
  }

  async save(user: User): Promise<User | null> {
    return new User("1", "niltoneapontes@gmail.com", "Nilton", "none");
  }
}
