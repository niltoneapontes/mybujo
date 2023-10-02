import { IUser, User } from "src/domain/user";

export interface IUserRepository {
  findByEmail(id: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<any> {
    const foundUser = await User.findOne({
      email: email,
    });
    return foundUser;
  }

  async save(user: IUser): Promise<any> {
    const newUser = new User({
      email: user.email,
      name: user.name,
      picture: user.picture,
      birthdate: user.birthdate,
      location: user.location,
    });
    await newUser.save();
    return newUser;
  }
}
