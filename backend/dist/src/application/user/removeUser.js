"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUser = void 0;
const User_1 = require("src/domain/user/User");
class RemoveUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user) {
        // manage user in db
        return new User_1.User({
            id: "1",
            email: "niltoneapontes@gmail.com",
            name: "Nilton",
            picture: "none",
        });
    }
}
exports.RemoveUser = RemoveUser;
