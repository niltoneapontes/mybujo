"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleApi_1 = require("../infrastructure/googleApi");
const CreateUserService_1 = __importDefault(require("../../../src/domain/application/users/CreateUserService"));
const UserRepository_1 = require("../repositories/UserRepository");
const User_1 = require("../infrastructure/entities/User");
const GetUserService_1 = __importDefault(require("../../../src/domain/application/users/GetUserService"));
async function userController(fastify) {
    const createUserService = new CreateUserService_1.default(new UserRepository_1.UserRepository(User_1.User));
    const getUserService = new GetUserService_1.default(new UserRepository_1.UserRepository(User_1.User));
    fastify.post("/login/google", (request, reply) => {
        googleApi_1.googleApi
            .get("/userinfo?alt=json", {
            headers: {
                Authorization: `Bearer ${request.body.access_token}`,
            },
        })
            .then(async (response) => {
            try {
                const user = await createUserService.execute(response);
                return reply.status(200).send(user);
            }
            catch (error) {
                return reply.status(500).send(error);
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
            const user = await getUserService.execute();
            return reply.status(200).send(user);
        }
        catch (error) {
            return reply.status(500).send(error);
        }
    });
}
exports.default = userController;
