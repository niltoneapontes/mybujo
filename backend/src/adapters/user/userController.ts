import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { googleApi } from "../../infrastructure/googleApi";
import { User } from "../../domain/user";

export default async function userController(fastify: FastifyInstance) {
  fastify.post("/login", {
    handler: async (
      request: FastifyRequest<{
        Body: {
          access_token: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const response = await googleApi.get<any, any>("/userinfo?alt=json", {
          headers: {
            Authorization: `Bearer ${request.body.access_token}`,
          },
        });

        return reply.status(201).send({
          id: response.id,
          email: response.email,
          name: response.name,
          picture: response.picture,
        });
      } catch (error) {
        return reply.status(500).send({
          error: error,
        });
      }
    },
  });

  fastify.get("/", async (request, reply) => {
    try {
      const newUser = new User({
        email: "niltoneapontes@gmail.com",
        name: "Nilton Pontes",
        picture: "none",
        birthdate: "01-02-03",
        location: "lat0.23, long2.03",
      });
      await newUser.save();
      reply.send(newUser);
    } catch (error) {
      reply.status(500).send({ message: error });
    }
  });
}
