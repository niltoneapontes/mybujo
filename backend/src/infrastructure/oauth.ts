import { FastifyInstance } from "fastify";
import oauthPlugin from "@fastify/oauth2";

export async function oAuthGoogle(fastify: FastifyInstance) {
  fastify.register(oauthPlugin, {
    name: "googleOAuth2",
    scope: ["profile", "email", "openid"],
    credentials: {
      client: {
        id: process.env.NODE_ENV_GOOGLE_OAUTH2_ID || "id",
        secret: process.env.NODE_ENV_GOOGLE_OAUTH2_SECRET || "secret",
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/login/google",
    callbackUri: "http://localhost:3000/login/google/callback",
    callbackUriParams: {
      access_type: "offline",
    },
  });

  fastify.get("/login/google/callback", async function (request, reply) {
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

    reply.send({ token: token });
  });

  fastify.post(
    "/login/google/refresh",
    async function (request: { body: any }, reply) {
      const { token: newToken } =
        await this.googleOAuth2.getNewAccessTokenUsingRefreshToken(
          request.body.token,
          {}
        );

      reply.send({ newToken: newToken });
    }
  );
}
