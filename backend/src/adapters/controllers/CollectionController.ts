import { FastifyInstance, FastifyRequest } from "fastify";
import { CollectionRepository } from "../repositories/CollectionRepository";
import { Collection } from "../infrastructure/entities/Collection";

export default async function collectionController(fastify: FastifyInstance) {
  const collectionRepository = new CollectionRepository(Collection);

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
        const newCollection = await collectionRepository.save({
          userId: request.body.user_id,
          content: request.body.content,
          title: request.body.title,
        });
        return reply.status(201).send(newCollection);
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
        const collectionList = await collectionRepository.findAllByUser(
          request.query.user_id
        );
        return reply.status(200).send(collectionList);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
