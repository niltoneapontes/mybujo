import { IUserRepository } from "src/adapters/user/userRepository";
import { IUser, User } from "../../domain/user";

export class AddUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: IUser): Promise<any> {
    return new User({
      id: "1",
      email: "niltoneapontes@gmail.com",
      name: "Nilton",
      picture: "none",
    });
  }
}
