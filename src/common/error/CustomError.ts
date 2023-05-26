export class CustomError extends Error {
  status: number;

  readonly isCustomError: boolean = true;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, CustomError);
  }
}
