"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUser = void 0;
const User_1 = require("../../domain/user/User");
class AddUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user) {
        const newUser = new User_1.User({
            id: user.id,
            email: user.email,
            name: user.name,
            picture: user.picture,
            loginProvider: user.loginProvider,
            birthdate: user.birthdate,
            location: user.location,
        });
        await newUser.save();
        return newUser;
    }
}
exports.AddUser = AddUser;
