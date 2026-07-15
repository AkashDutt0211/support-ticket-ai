export interface ApiSuccess<T> {
  data: T;
}

export interface ApiErrorBody {
  code: string;
  message: string;
}

export interface ValidationIssue {
  code: string;
  message: string;
  field: string;
}

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class ValidationApiError extends ApiError {
  readonly issues: ValidationIssue[];

  constructor(issues: ValidationIssue[]) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
    this.issues = issues;
  }
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    return err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unexpected error occurred';
}

export function getFieldErrors(err: unknown): Record<string, string> {
  if (!(err instanceof ValidationApiError)) {
    return {};
  }
  return err.issues.reduce<Record<string, string>>((acc, issue) => {
    acc[issue.field] = issue.message;
    return acc;
  }, {});
}
