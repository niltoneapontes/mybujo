"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleApi_1 = require("../../infrastructure/googleApi");
const user_1 = require("../../domain/user");
async function userController(fastify) {
    fastify.post("/login", {
        handler: async (request, reply) => {
            try {
                const response = await googleApi_1.googleApi.get("/userinfo?alt=json", {
                    headers: {
                        Authorization: `Bearer ${request.body.access_token}`,
                    },
                });
                return reply.status(201).send({
                    id: response.id,
                    email: response.email,
                    name: response.name,
                    picture: response.picture,
                });
            }
            catch (error) {
                return reply.status(500).send({
                    error: error,
                });
            }
        },
    });
    fastify.get("/", async (request, reply) => {
        try {
            const newUser = new user_1.User({
                email: "niltoneapontes@gmail.com",
                name: "Nilton Pontes",
                picture: "none",
                birthdate: "01-02-03",
                location: "lat0.23, long2.03",
            });
            await newUser.save();
            reply.send(newUser);
        }
        catch (error) {
            reply.status(500).send({ message: error });
        }
    });
}
exports.default = userController;
