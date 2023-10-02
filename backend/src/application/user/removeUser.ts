import { IUserRepository } from "src/adapters/user/userRepository";
import { IUser, User } from "src/domain/user";

export class RemoveUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: IUser): Promise<any> {
    // manage user in db
    return new User({
      id: "1",
      email: "niltoneapontes@gmail.com",
      name: "Nilton",
      picture: "none",
    });
  }
}
