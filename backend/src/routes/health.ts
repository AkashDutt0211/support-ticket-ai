import { Router } from 'express';
import { pingDatabase } from '../lib/prisma.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res, next) => {
  try {
    await pingDatabase();
    res.status(200).json({ data: { status: 'ok' } });
  } catch (err) {
    next(err);
  }
});
