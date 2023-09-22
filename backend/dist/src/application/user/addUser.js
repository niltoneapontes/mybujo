"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser = void 0;
const user_1 = require("src/domain/user");
class AddUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user) {
        // manage user in db
        return new user_1.User("1", "niltoneapontes@gmail.com", "Nilton", "none");
    }
}
exports.AddUser = AddUser;
