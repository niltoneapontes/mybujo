"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("../../domain/user");
class UserRepository {
    async findByEmail(email) {
        const foundUser = await user_1.User.findOne({
            email: email,
        });
        return foundUser;
    }
    async save(user) {
        const newUser = new user_1.User({
            id: user.id,
            email: user.email,
            name: user.name,
            picture: user.picture,
            birthdate: user.birthdate,
            location: user.location,
        });
        await newUser.save();
        return newUser;
    }
    async delete(user) {
        const deletedUser = await user_1.User.findOneAndDelete({
            email: user.email,
        });
        return deletedUser;
    }
}
exports.UserRepository = UserRepository;
