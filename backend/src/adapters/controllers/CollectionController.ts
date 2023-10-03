import { FastifyInstance, FastifyRequest } from "fastify";
import { CollectionRepository } from "../repositories/CollectionRepository";
import { Collection } from "../infrastructure/entities/Collection";
import CreateCollectionService from "../../../src/domain/application/collections/CreateCollectionService";
import ListCollectionsService from "../../../src/domain/application/collections/ListCollectionsService";

export default async function collectionController(fastify: FastifyInstance) {
  const createCollectionService = new CreateCollectionService(
    new CollectionRepository(Collection)
  );
  const listCollectionsService = new ListCollectionsService(
    new CollectionRepository(Collection)
  );

  fastify.post(
    "/create",
    async (
      request: FastifyRequest<{
        Body: {
          user_id: string;
          content: string;
          title: string;
        };
      }>,
      reply
    ) => {
      try {
        const collection = await createCollectionService.execute({
          user_id: request.body.user_id,
          content: request.body.content,
          title: request.body.title,
        });
        return reply.status(200).send(collection);
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
        const collectionList = await listCollectionsService.execute(
          request.query.user_id
        );
        return reply.status(200).send(collectionList);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
