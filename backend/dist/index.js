"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const oauth2_1 = __importDefault(require("@fastify/oauth2"));
const dotenv_1 = __importDefault(require("dotenv"));
const userController_1 = __importDefault(require("./src/adapters/user/userController"));
const database_1 = require("./src/infrastructure/database");
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.get("/", (_request, reply) => {
    return reply.send({
        code: 200,
        message: "OK",
        body: {},
    });
});
fastify.decorate("verifyJwt", () => {
    return {
        user: "Name",
        age: 31,
    };
});
fastify.addHook("onRequest", async () => {
    fastify.log.info("Got a request");
});
fastify.register(database_1.dbConnector);
fastify.register(userController_1.default, {
    prefix: "/users",
});
fastify.register(oauth2_1.default, {
    name: "googleOAuth2",
    scope: ["profile", "email", "openid"],
    credentials: {
        client: {
            id: process.env.NODE_ENV_GOOGLE_OAUTH2_ID || "id",
            secret: process.env.NODE_ENV_GOOGLE_OAUTH2_SECRET || "secret",
        },
        auth: oauth2_1.default.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    callbackUri: "http://localhost:3000/login/google/callback",
    callbackUriParams: {
        access_type: "offline",
    },
});
fastify.get("/login/google/callback", async function (request, reply) {
    const { token } = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    reply.send({ token: token });
});
fastify.post("/login/google/refresh", async function (request, reply) {
    const { token: newToken } = await this.googleOAuth2.getNewAccessTokenUsingRefreshToken(request.body.token, {});
    reply.send({ newToken: newToken });
});
fastify.register(oauth2_1.default, {
    name: "apple",
    credentials: {
        client: {
            id: process.env.NODE_ENV_FACEBOOK_OAUTH2_ID || "id",
            secret: process.env.NODE_ENV_FACEBOOK_OAUTH2_SECRET || "secret",
        },
        auth: oauth2_1.default.FACEBOOK_CONFIGURATION,
    },
    startRedirectPath: "/login/facebook",
    callbackUri: "http://localhost:3000/login/facebook/callback",
    callbackUriParams: {
        access_type: "offline",
    },
});
fastify.get("/login/facebook/callback", async function (request, reply) {
    const { token } = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
    reply.send({ token: token });
});
fastify.post("/login/facebook/refresh", async function (request, reply) {
    const { token: newToken } = await this.facebookOAuth2.getNewAccessTokenUsingRefreshToken(request.body.token, {});
    reply.send({ newToken: newToken });
});
fastify.listen({
    port: 3000,
}, (err, address) => {
    if (err) {
        fastify.log.error("Server failed to start. Error: ", err);
        process.exit(1);
    }
    fastify.log.info("Server running at port 3000");
    fastify.log.info(address);
});
