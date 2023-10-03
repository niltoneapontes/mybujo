import { IUser, LoginProvider } from "../../../../src/domain/models/IUser";
import { IUserRepository } from "../../interfaces/IUserRepository";

export default class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(response: any): Promise<IUser | null> {
    try {
      const foundUser = await this.userRepository.findByEmail(
        response.data.email
      );

      if (!foundUser) {
        const savedUser = await this.userRepository.save({
          email: response.data.email,
          name: response.data.name,
          picture: response.data.picture,
          loginProvider: LoginProvider.GOOGLE,
          id: response.data.id,
        });
        return savedUser;
      }
      return foundUser;
    } catch (error) {
      throw new Error(
        "Não foi possível encontrar nem criar um usuário com essas informações."
      );
    }
  }
}
