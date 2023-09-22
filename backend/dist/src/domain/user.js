"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    name;
    picture;
    constructor(id, email, name, picture) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.picture = picture;
    }
}
exports.User = User;
