import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ItemRepository } from "../repositories/ItemRepository";
import { Item } from "../infrastructure/entities/Item";
import { ItemType } from "../../domain/models/IItem";

export default async function itemController(fastify: FastifyInstance) {
  const itemRepository = new ItemRepository(Item);

  fastify.post(
    "/create",
    async (
      request: FastifyRequest<{
        Body: {
          user_id: string;
          content: string;
        };
      }>,
      reply
    ) => {
      try {
        const newItem = await itemRepository.save({
          userId: request.body.user_id,
          content: request.body.content,
          date: Date.now().toString(),
          type: ItemType.Daily,
        });
        return reply.status(201).send(newItem);
      } catch (error) {
        return reply.status(500).send({ message: error });
      }
    }
  );

  fastify.get(
    "/",
    async (
      request: FastifyRequest<{
        Querystring: {
          user_id: string;
        };
      }>,
      reply
    ) => {
      try {
        const itemsList = await itemRepository.findAllByUser(
          request.query.user_id
        );
        return reply.status(200).send(itemsList);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
