import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { describe, expect, it, vi } from 'vitest';
import { validate } from '../../src/middleware/validate.js';

describe('validate middleware', () => {
  const schema = z.object({
    title: z.string().min(1),
  });

  it('parses valid body and calls next', () => {
    const req = { body: { title: 'Valid title' } } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    validate(schema)(req, res, next);

    expect(req.body).toEqual({ title: 'Valid title' });
    expect(next).toHaveBeenCalledWith();
  });

  it('forwards ZodError when body is invalid', () => {
    const req = { body: { title: '' } } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    validate(schema)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const error = (next as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(error?.name).toBe('ZodError');
  });

  it('validates query params when source is query', () => {
    const querySchema = z.object({ search: z.string().optional() });
    const req = { query: { search: 'login' } } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    validate(querySchema, 'query')(req, res, next);

    expect(req.query).toEqual({ search: 'login' });
    expect(next).toHaveBeenCalledWith();
  });

  it('validates route params when source is params', () => {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const req = {
      params: { id: '00000000-0000-0000-0000-000000000001' },
    } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    validate(paramsSchema, 'params')(req, res, next);

    expect(req.params).toEqual({ id: '00000000-0000-0000-0000-000000000001' });
    expect(next).toHaveBeenCalledWith();
  });
});
