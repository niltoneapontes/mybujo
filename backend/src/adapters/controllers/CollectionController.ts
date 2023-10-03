import { FastifyInstance, FastifyRequest } from "fastify";
import { CollectionRepository } from "../repositories/CollectionRepository";
import { Collection } from "../infrastructure/entities/Collection";
import CreateCollectionService from "../../../src/domain/application/collections/CreateCollectionService";
import ListCollectionsService from "../../../src/domain/application/collections/ListCollectionsService";
import EditCollectionDetailsService from "src/domain/application/collections/EditCollectionDetailsService";
import GetCollectionDetailsService from "src/domain/application/collections/GetCollectionDetailsService";
import RemoveCollectionService from "src/domain/application/collections/RemoveCollectionService";

export default async function collectionController(fastify: FastifyInstance) {
  const createCollectionService = new CreateCollectionService(
    new CollectionRepository(Collection)
  );
  const listCollectionsService = new ListCollectionsService(
    new CollectionRepository(Collection)
  );
  const editCollectionDetailsService = new EditCollectionDetailsService(
    new CollectionRepository(Collection)
  );
  const getCollectionDetailsService = new GetCollectionDetailsService(
    new CollectionRepository(Collection)
  );
  const removeCollectionService = new RemoveCollectionService(
    new CollectionRepository(Collection)
  );

  fastify.post(
    "/",
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

  fastify.put(
    "/",
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
        Body: {
          content: string;
          title: string;
        };
      }>,
      reply
    ) => {
      try {
        const collection = await editCollectionDetailsService.execute(
          request.params.id,
          {
            content: request.body.content,
            title: request.body.title,
          }
        );
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

  fastify.get(
    "/",
    async (
      request: FastifyRequest<{
        Querystring: {
          id: string;
        };
      }>,
      reply
    ) => {
      try {
        const collectionList = await getCollectionDetailsService.execute(
          request.query.id
        );
        return reply.status(200).send(collectionList);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  fastify.delete(
    "/",
    async (
      request: FastifyRequest<{
        Querystring: {
          id: string;
        };
      }>,
      reply
    ) => {
      try {
        const collectionList = await removeCollectionService.execute(
          request.query.id
        );
        return reply.status(200).send(collectionList);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
