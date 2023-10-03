import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ItemRepository } from "../repositories/ItemRepository";
import { Item } from "../infrastructure/entities/Item";
import CreateItemService from "../../../src/domain/application/items/CreateItemService";
import ListItemsService from "../../../src/domain/application/items/ListItemsService";
import { ItemType } from "../../../src/domain/models/IItem";

export default async function itemController(fastify: FastifyInstance) {
  const createItemService = new CreateItemService(new ItemRepository(Item));
  const listItemsService = new ListItemsService(new ItemRepository(Item));

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
        const item = await createItemService.execute({
          user_id: request.body.user_id,
          content: request.body.content,
          date: Date.now().toString(),
          type: ItemType.Daily,
        });
        return reply.status(200).send(item);
      } catch (error) {
        return reply.status(500).send(error);
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
        const item = await listItemsService.execute(request.query.user_id);
        return reply.status(200).send(item);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
