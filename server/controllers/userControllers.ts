import type { FastifyRequest, FastifyReply } from "fastify";
import { addUserService, checkUserService } from "../services/userServices.js";
import type { User } from "../types/user.ts";

interface AddUserBody {
  user: User;
}
interface checkUserBody {
  username: string;
  password: string;
}
const addUserController = async (
  request: FastifyRequest<{ Body: AddUserBody }>,
  reply: FastifyReply,
) => {
  try {
    const { user } = request.body;
    await addUserService(user);
    reply.status(201).send("user added successfully");
  } catch (error: unknown) {
    request.log.error(error);
    const errorMsg =
      error instanceof Error ? error.message : "An error occurred";
    console.error(errorMsg);
  }
};

const checkUserController = async (
  request: FastifyRequest<{ Body: checkUserBody }>,
  reply: FastifyReply,
) => {
  try {
    const { username, password } = request.body;

    await checkUserService(username, password);

    const payload = { username };
    const token = request.server.jwt.sign(payload);
    return reply
      .setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600 * 24,
      })
      .status(200)
      .send({
        message: "User logged in successfully",
        user: { username },
      });
  } catch (error: unknown) {
    request.log.error(error);
    const errorMsg =
      error instanceof Error ? error.message : "An error occurred";
    console.error(errorMsg);
  }
  return reply.status(500).send({ error: "Internal Server Error" });
};

export { addUserController, checkUserController };
