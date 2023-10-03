import { IUser } from "../../../../src/domain/models/IUser";
import { IUserRepository } from "../../interfaces/IUserRepository";

export default class GetUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(email: string): Promise<IUser | null> {
    try {
      const foundUser = await this.userRepository.findByEmail(email);
      return foundUser;
    } catch (error) {
      throw new Error("Nenhum usuário encontrado");
    }
  }
}
