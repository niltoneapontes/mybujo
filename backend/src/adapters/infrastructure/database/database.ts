import { FastifyInstance } from "fastify";
import mongoose from "mongoose";

export async function connect(fastify: FastifyInstance) {
  try {
    await mongoose.connect(
      process.env.NODE_ENV_MONGO_PASSWORD ||
        "mongodb+srv://nilton:<password>@cluster0.j2mrx.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    fastify.log.error({
      message: "Could not connect to database",
      details: error,
      connectUrl: process.env.NODE_ENV_MONGO_PASSWORD,
    });
  }
}
