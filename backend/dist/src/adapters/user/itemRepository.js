"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRepository = void 0;
const user_1 = require("src/domain/user");
class ItemRepository {
    async findById(id) {
        return new user_1.User({
            id: "1",
            email: "niltoneapontes@gmail.com",
            name: "Nilton",
            picture: "none",
        });
    }
    async save(user) {
        return new user_1.User({
            id: "1",
            email: "niltoneapontes@gmail.com",
            name: "Nilton",
            picture: "none",
        });
    }
}
exports.ItemRepository = ItemRepository;
