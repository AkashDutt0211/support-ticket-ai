import type { NextFunction, Request, Response } from 'express';
import { Prisma } from 'database';
import { ZodError, z } from 'zod';
import { describe, expect, it, vi } from 'vitest';
import { AppError } from '../../src/errors/AppError.js';
import { NotFoundError } from '../../src/errors/NotFoundError.js';
import { ValidationError } from '../../src/errors/ValidationError.js';
import { errorHandler } from '../../src/middleware/errorHandler.js';

function createMockResponse(): Response {
  const res = {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
  return res as unknown as Response;
}

describe('errorHandler', () => {
  const next = vi.fn() as NextFunction;

  it('maps ValidationError to 400 with issues array', () => {
    const res = createMockResponse();
    const err = new ValidationError([
      { code: 'INVALID', message: 'Title required', field: 'title' },
    ]);

    errorHandler(err, {} as Request, res, next);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      errors: [{ code: 'INVALID', message: 'Title required', field: 'title' }],
    });
  });

  it('maps AppError subclasses to status and error body', () => {
    const res = createMockResponse();
    const err = new NotFoundError('Ticket', 'ticket-1');

    errorHandler(err, {} as Request, res, next);

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: {
        code: 'NOT_FOUND',
        message: 'Ticket with id ticket-1 not found',
      },
    });
  });

  it('maps ZodError to 400 with field paths', () => {
    const res = createMockResponse();
    const schema = z.object({ title: z.string().min(1) });
    const parsed = schema.safeParse({ title: '' });
    if (parsed.success) {
      throw new Error('Expected validation failure');
    }

    errorHandler(parsed.error, {} as Request, res, next);

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({
      errors: [{ code: 'INVALID', field: 'title' }],
    });
  });

  it('maps Prisma P2025 to 404 NOT_FOUND', () => {
    const res = createMockResponse();
    const err = new Prisma.PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '6.9.0',
    });

    errorHandler(err, {} as Request, res, next);

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({
      error: { code: 'NOT_FOUND', message: 'Resource not found' },
    });
  });

  it('returns 500 for unknown errors', () => {
    const res = createMockResponse();

    errorHandler(new Error('boom'), {} as Request, res, next);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
    });
  });

  it('maps generic AppError to configured status code', () => {
    const res = createMockResponse();
    const err = new AppError('Forbidden', 403, 'FORBIDDEN');

    errorHandler(err, {} as Request, res, next);

    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({
      error: { code: 'FORBIDDEN', message: 'Forbidden' },
    });
  });
});
