import Fastify, { FastifyInstance } from "fastify";
import oauthPlugin, { OAuth2Namespace } from "@fastify/oauth2";
import dotenv from "dotenv";
import userRoutes from "./src/adapters/user/userController";
import { dbConnector } from "./src/infrastructure/database";

dotenv.config();

const fastify: FastifyInstance = Fastify({
  logger: true,
});

interface IQueryInterface {
  username: string;
  password: string;
}

interface IHeaders {
  "x-access-token": string;
}

interface IReply {
  code: number;
  message: string;
  body: any;
}

declare module "fastify" {
  export interface FastifyInstance {
    verifyJwt: () => any;
    googleOAuth2: OAuth2Namespace;
    facebookOAuth2: OAuth2Namespace;
  }
}

fastify.get<{ QueryString: IQueryInterface; Headers: IHeaders; Reply: IReply }>(
  "/",
  (_request: any, reply: { send: (args: IReply) => any }) => {
    return reply.send({
      code: 200,
      message: "OK",
      body: {},
    });
  }
);

fastify.decorate("verifyJwt", () => {
  return {
    user: "Name",
    age: 31,
  };
});

fastify.addHook("onRequest", async () => {
  fastify.log.info("Got a request");
});

fastify.register(dbConnector);
fastify.register(userRoutes, {
  prefix: "/users",
});
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

fastify.register(oauthPlugin, {
  name: "apple",
  credentials: {
    client: {
      id: process.env.NODE_ENV_FACEBOOK_OAUTH2_ID || "id",
      secret: process.env.NODE_ENV_FACEBOOK_OAUTH2_SECRET || "secret",
    },
    auth: oauthPlugin.FACEBOOK_CONFIGURATION,
  },
  startRedirectPath: "/login/facebook",
  callbackUri: "http://localhost:3000/login/facebook/callback",
  callbackUriParams: {
    access_type: "offline",
  },
});

fastify.get("/login/facebook/callback", async function (request, reply) {
  const { token } =
    await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

  reply.send({ token: token });
});

fastify.post(
  "/login/facebook/refresh",
  async function (request: { body: any }, reply) {
    const { token: newToken } =
      await this.facebookOAuth2.getNewAccessTokenUsingRefreshToken(
        request.body.token,
        {}
      );

    reply.send({ newToken: newToken });
  }
);

fastify.listen(
  {
    port: 3000,
  },
  (err, address) => {
    if (err) {
      fastify.log.error("Server failed to start. Error: ", err);
      process.exit(1);
    }
    fastify.log.info("Server running at port 3000");
    fastify.log.info(address);
  }
);
