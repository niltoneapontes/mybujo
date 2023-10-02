"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuthGoogle = void 0;
const oauth2_1 = __importDefault(require("@fastify/oauth2"));
async function oAuthGoogle(fastify) {
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
}
exports.oAuthGoogle = oAuthGoogle;
