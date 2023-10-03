import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { googleApi } from "../infrastructure/googleApi";
import { UserRepository } from "../repositories/UserRepository";
import { LoginProvider } from "../../domain/models/IUser";
import { User } from "../infrastructure/entities/User";

export default async function userController(fastify: FastifyInstance) {
  const userRepository = new UserRepository(User);

  fastify.post(
    "/login/google",
    (
      request: FastifyRequest<{
        Body: {
          access_token: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      googleApi
        .get<any, any>("/userinfo?alt=json", {
          headers: {
            Authorization: `Bearer ${request.body.access_token}`,
          },
        })
        .then(async (response) => {
          try {
            const foundUser = await userRepository.findByEmail(
              response.data.email
            );

            if (!foundUser) {
              const savedUser = await userRepository.save({
                email: response.data.email,
                name: response.data.name,
                picture: response.data.picture,
                loginProvider: LoginProvider.GOOGLE,
                id: response.data.id,
              });
              return reply.status(201).send(savedUser);
            }

            return reply.status(200).send(foundUser);
          } catch (error) {
            return reply.status(500).send({
              error: error,
            });
          }
        })
        .catch((error) => {
          return reply.status(404).send({
            message: "Google API Error",
            error: error,
          });
        });
    }
  );

  fastify.get("/profile", async (request, reply) => {
    try {
      const foundUser = await userRepository.findByEmail(
        "niltoneapontes@gmail.com"
      );
      return reply.send(foundUser);
    } catch (error) {
      return reply.status(500).send({ message: error });
    }
  });
}
