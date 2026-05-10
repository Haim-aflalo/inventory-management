import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/userRouter.js';

const fastify = Fastify();
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
fastify.register(userRoutes, { prefix: '/users' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(' Server start on url: http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
