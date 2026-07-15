export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(message: string, statusCode: number, code: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
  }
}
