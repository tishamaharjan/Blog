export class AppError extends Error {
  public readonly status: number;

  constructor(message: string, status = 500) {
    super(message); //initialize the parent class because this is extended class

    this.name = "AppError";
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}
