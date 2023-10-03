import { IUser } from "../../models/IUser";
import { IUserRepository } from "../../interfaces/IUserRepository";

export default class RemoveUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(email: string): Promise<IUser | null> {
    try {
      const foundUser = await this.userRepository.findByEmail(email);
      if (!foundUser) return null;
      const deletedUser = await this.userRepository.delete(foundUser);
      return deletedUser;
    } catch (error) {
      throw new Error("Não foi possível deletar esse usuário.");
    }
  }
}
