import mongoose from "mongoose";
import { IUser } from "../../domain/models/IUser";
import { IUserRepository } from "src/domain/interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
  constructor(private User: mongoose.Model<any>) {}

  async findByEmail(email: string): Promise<any> {
    const foundUser = await this.User.findOne({
      email: email,
    });
    return foundUser;
  }

  async save(user: IUser): Promise<any> {
    const newUser = new this.User({
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      loginProvider: user.loginProvider,
      birthdate: user.birthdate,
      location: user.location,
    });
    await newUser.save();
    return newUser;
  }

  async delete(user: IUser): Promise<any> {
    const deletedUser = await this.User.findOneAndDelete({
      email: user.email,
    });

    return deletedUser;
  }
}
