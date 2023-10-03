"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleApi_1 = require("../infrastructure/googleApi");
const UserRepository_1 = require("./UserRepository");
const User_1 = require("../../domain/models/User");
async function userController(fastify) {
    const userRepository = new UserRepository_1.UserRepository();
    fastify.post("/login/google", (request, reply) => {
        googleApi_1.googleApi
            .get("/userinfo?alt=json", {
            headers: {
                Authorization: `Bearer ${request.body.access_token}`,
            },
        })
            .then(async (response) => {
            try {
                const foundUser = await userRepository.findByEmail(response.data.email);
                if (!foundUser) {
                    const savedUser = await userRepository.save({
                        email: response.data.email,
                        name: response.data.name,
                        picture: response.data.picture,
                        loginProvider: User_1.LoginProvider.GOOGLE,
                        id: response.data.id,
                    });
                    return reply.status(201).send(savedUser);
                }
                return reply.status(200).send(foundUser);
            }
            catch (error) {
                return reply.status(500).send({
                    error: error,
                });
            }
        })
            .catch((error) => {
            return reply.status(404).send({
                message: "Google API Error",
                error: error,
            });
        });
    });
    fastify.get("/profile", async (request, reply) => {
        try {
            const foundUser = await userRepository.findByEmail("niltoneapontes@gmail.com");
            return reply.send(foundUser);
        }
        catch (error) {
            return reply.status(500).send({ message: error });
        }
    });
}
exports.default = userController;
