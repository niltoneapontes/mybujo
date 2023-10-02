"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("src/domain/user");
class UserRepository {
    async findByEmail(email) {
        const foundUser = await user_1.User.findOne({
            email: email,
        });
        return foundUser;
    }
    async save(user) {
        const newUser = new user_1.User({
            email: user.email,
            name: user.name,
            picture: user.picture,
            birthdate: user.birthdate,
            location: user.location,
        });
        await newUser.save();
        return newUser;
    }
}
exports.UserRepository = UserRepository;
