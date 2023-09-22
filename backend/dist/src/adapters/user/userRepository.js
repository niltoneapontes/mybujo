"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("src/domain/user");
class UserRepository {
    async findById(id) {
        return new user_1.User("1", "niltoneapontes@gmail.com", "Nilton", "none");
    }
    async save(user) {
        return new user_1.User("1", "niltoneapontes@gmail.com", "Nilton", "none");
    }
}
exports.UserRepository = UserRepository;
