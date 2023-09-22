"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUser = void 0;
const user_1 = require("src/domain/user");
class RemoveUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user) {
        // manage user in db
        return new user_1.User("1", "niltoneapontes@gmail.com", "Nilton", "none");
    }
}
exports.RemoveUser = RemoveUser;
