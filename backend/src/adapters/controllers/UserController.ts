import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { googleApi } from "../infrastructure/googleApi";
import CreateUserService from "../../../src/domain/application/users/CreateUserService";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../infrastructure/entities/User";
import GetUserService from "../../../src/domain/application/users/GetUserService";

export default async function userController(fastify: FastifyInstance) {
  const createUserService = new CreateUserService(new UserRepository(User));
  const getUserService = new GetUserService(new UserRepository(User));

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
        .then(async (response: any) => {
          try {
            const user = await createUserService.execute(response);
            return reply.status(200).send(user);
          } catch (error) {
            return reply.status(500).send(error);
          }
        })
        .catch((error: Error) => {
          return reply.status(404).send({
            message: "Google API Error",
            error: error,
          });
        });
    }
  );

  fastify.get(
    "/profile",
    async (
      request: FastifyRequest<{
        Body: {
          email: string;
        };
      }>,
      reply
    ) => {
      try {
        const user = await getUserService.execute(request.body.email);
        return reply.status(200).send(user);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
