import { IUserRepository } from "src/adapters/user/userRepository";
import { User } from "src/domain/user";

export class RemoveUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User> {
    // manage user in db
    return new User("1", "niltoneapontes@gmail.com", "Nilton", "none");
  }
}
