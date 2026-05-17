import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import { userRoutes } from './routes/userRouter.js';
import jwt from '@fastify/jwt';
import 'dotenv/config';

const fastify = Fastify();

fastify.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET || 'un-secret-tres-long-et-sur',
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET as string,
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


//leurn cors
 