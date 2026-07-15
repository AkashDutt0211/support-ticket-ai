import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';
import { ticketsRouter } from './routes/tickets.js';
import { usersRouter } from './routes/users.js';

export function createApp(): express.Application {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
  app.use(express.json());

  app.use('/api/health', healthRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/tickets', ticketsRouter);

  app.use(errorHandler);

  return app;
}
