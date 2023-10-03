"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetUserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute() {
        try {
            const foundUser = await this.userRepository.findByEmail("niltoneapontes@gmail.com");
            return foundUser;
        }
        catch (error) {
            throw new Error("Nenhum usuário encontrado");
        }
    }
}
exports.default = GetUserService;
