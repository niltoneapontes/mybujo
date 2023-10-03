"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    User;
    constructor(User) {
        this.User = User;
    }
    async findByEmail(email) {
        const foundUser = await this.User.findOne({
            email: email,
        });
        return foundUser;
    }
    async save(user) {
        const newUser = new this.User({
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
        const deletedUser = await this.User.findOneAndDelete({
            email: user.email,
        });
        return deletedUser;
    }
}
exports.UserRepository = UserRepository;
