import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import fastifyMongo from "@fastify/mongodb";

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

async function dbConnector(fastify: FastifyInstance) {
  fastify
    .register(fastifyMongo, {
      url: "mongodb://localhost:27017/mybujo",
    })
    .then((response) => {
      fastify.log.info("Connected to database");
    });
}

fastify.decorate("verifyJwt", () => {
  return {
    user: "Name",
    age: 31,
  };
});

fastify.addHook("onRequest", async () => {
  fastify.log.info("Got a request");
});

async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{
        Body: {
          name: string;
          age: number;
        };
      }>,
      reply: FastifyReply
    ) => {
      return reply.send({
        code: 201,
        message: "User Created",
        body: fastify.verifyJwt(),
      });
    },
  });
}

fastify.register(dbConnector);
fastify.register(userRoutes, {
  prefix: "/users",
});

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
