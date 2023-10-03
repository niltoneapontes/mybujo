"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../../domain/models/User");
class UserRepository {
    async findByEmail(email) {
        const foundUser = await User_1.User.findOne({
            email: email,
        });
        return foundUser;
    }
    async save(user) {
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
    async delete(user) {
        const deletedUser = await User_1.User.findOneAndDelete({
            email: user.email,
        });
        return deletedUser;
    }
}
exports.UserRepository = UserRepository;
