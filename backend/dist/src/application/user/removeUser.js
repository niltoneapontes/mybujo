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
        return new user_1.User({
            id: "1",
            email: "niltoneapontes@gmail.com",
            name: "Nilton",
            picture: "none",
        });
    }
}
exports.RemoveUser = RemoveUser;
