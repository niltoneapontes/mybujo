import fastifyMongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

export async function dbConnector(fastify: FastifyInstance) {
  fastify
    .register(fastifyMongodb, {
      url: "mongodb://localhost:27017/mybujo",
    })
    .then((response) => {
      fastify.log.info("Connected to database");
    });
}
