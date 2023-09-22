import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function userController(fastify: FastifyInstance) {
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

  fastify.get("/", (request, reply) => {
    reply.send({ user: "Joao" });
  });
}
