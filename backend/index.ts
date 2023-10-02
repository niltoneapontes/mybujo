import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
import { OAuth2Namespace } from "@fastify/oauth2";
import { oAuthGoogle } from "./src/infrastructure/oauth";
import userController from "./src/adapters/user/userController";
import { connect } from "./src/infrastructure/database/database";
import itemController from "./src/adapters/item/itemController";
import collectionController from "./src/adapters/collection/collectionController";

dotenv.config();

const fastify: FastifyInstance = Fastify({
  logger: true,
});

declare module "fastify" {
  export interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    facebookOAuth2: OAuth2Namespace;
  }
}

fastify.addHook("onRequest", async () => {
  fastify.log.info("Incomming request");
});

fastify.register(userController, {
  prefix: "/users",
});
fastify.register(itemController, {
  prefix: "/items",
});
fastify.register(collectionController, {
  prefix: "/collections",
});

fastify.register(oAuthGoogle);

fastify.ready();

connect(fastify);

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
