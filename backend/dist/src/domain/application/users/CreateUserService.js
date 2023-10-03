"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IUser_1 = require("../../../../src/domain/models/IUser");
class CreateUserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(response) {
        try {
            const foundUser = await this.userRepository.findByEmail(response.data.email);
            if (!foundUser) {
                const savedUser = await this.userRepository.save({
                    email: response.data.email,
                    name: response.data.name,
                    picture: response.data.picture,
                    loginProvider: IUser_1.LoginProvider.GOOGLE,
                    id: response.data.id,
                });
                return savedUser;
            }
            return foundUser;
        }
        catch (error) {
            throw new Error("Não foi possível encontrar nem criar um usuário com essas informações.");
        }
    }
}
exports.default = CreateUserService;
