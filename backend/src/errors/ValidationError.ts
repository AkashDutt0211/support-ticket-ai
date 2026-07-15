import { AppError } from './AppError.js';

export interface ValidationIssue {
  code: string;
  message: string;
  field: string;
}

export class ValidationError extends AppError {
  readonly issues: ValidationIssue[];

  constructor(issues: ValidationIssue[]) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
    this.issues = issues;
  }
}
