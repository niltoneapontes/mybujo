import { FastifyInstance } from "fastify";
import { Collection } from "../../domain/collection";

export default async function collectionController(fastify: FastifyInstance) {
  fastify.get("/all", async (request, reply) => {
    try {
      const collection = new Collection({
        userId: "123456",
        title: "Idk",
        content: "* Task",
      });
      collection.save();
      reply.send({ message: "created collection" });
    } catch (error) {
      reply.status(500).send({ message: error });
    }
  });
}
