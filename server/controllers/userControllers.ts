import type { FastifyRequest, FastifyReply } from 'fastify';
import { addUserService, checkUserService } from '../services/userServices.js';
import type { User } from '../types/user.ts';

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
    reply.status(201).send('user added successfully');
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

const checkUserController = async (
  request: FastifyRequest<{ Body: checkUserBody }>,
  reply: FastifyReply,
) => {
  try {
    const { username, password } = request.body;
    const result = await checkUserService(username, password);
    return reply.status(200).send({ 
      message: 'User logged in successfully',
      data: result 
    });
  } catch (error: any) {
    request.log.error(error);
    if (error.message === 'User not found or password incorrect') {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export { addUserController, checkUserController };
