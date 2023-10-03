import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
import { OAuth2Namespace } from "@fastify/oauth2";
import { oAuthGoogle } from "./src/adapters/infrastructure/oauth";
import userController from "./src/adapters/controllers/UserController";
import { connect } from "./src/adapters/infrastructure/database/database";
import itemController from "./src/adapters/controllers/ItemController";
import collectionController from "./src/adapters/controllers/CollectionController";

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
