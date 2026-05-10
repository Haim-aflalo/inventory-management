import type { FastifyInstance } from 'fastify';
import {
  addUserController,
  checkUserController,
} from '../controllers/userControllers.js';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/register', addUserController);
  fastify.post('/login', checkUserController);
};
