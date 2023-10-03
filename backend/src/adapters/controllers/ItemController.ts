import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ItemRepository } from "../repositories/ItemRepository";
import { Item } from "../infrastructure/entities/Item";
import CreateItemService from "../../../src/domain/application/items/CreateItemService";
import ListItemsService from "../../../src/domain/application/items/ListItemsService";
import { ItemType, getEnumFromValue } from "../../../src/domain/models/IItem";
import EditItemDetailsService from "../../../src/domain/application/items/EditItemDetailsService";

export default async function itemController(fastify: FastifyInstance) {
  const createItemService = new CreateItemService(new ItemRepository(Item));
  const listItemsService = new ListItemsService(new ItemRepository(Item));
  const editItemDetailsService = new EditItemDetailsService(
    new ItemRepository(Item)
  );

  fastify.post(
    "/",
    async (
      request: FastifyRequest<{
        Body: {
          user_id: string;
          content: string;
          item_type: string;
        };
      }>,
      reply
    ) => {
      try {
        const item = await createItemService.execute({
          user_id: request.body.user_id,
          content: request.body.content,
          date: Date.now().toString(),
          type: getEnumFromValue(request.body.item_type),
        });
        return reply.status(200).send(item);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  fastify.put(
    "/",
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
        Body: {
          content: string;
          item_type: string;
        };
      }>,
      reply
    ) => {
      try {
        const item = await editItemDetailsService.execute(request.params.id, {
          content: request.body.content,
          date: Date.now().toString(),
          type: getEnumFromValue(request.body.item_type),
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
