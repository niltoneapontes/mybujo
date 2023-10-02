import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Item, ItemType } from "../../domain/item";

export default async function itemController(fastify: FastifyInstance) {
  fastify.get("/all", async (request, reply) => {
    try {
      const item = new Item({
        userId: "123456",
        content: "* Task",
        date: "01-02-03",
        type: ItemType.Daily,
      });
      item.save();
      reply.send({ message: "created item" });
    } catch (error) {
      reply.status(500).send({ message: error });
    }
  });
}
