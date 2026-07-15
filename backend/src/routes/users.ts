import { Router } from 'express';
import { userRepository } from '../repositories/userRepository.js';

export const usersRouter = Router();

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await userRepository.findAll();
    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
});
