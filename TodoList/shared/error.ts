export abstract class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly type: string
  ) {
    super(message);
  }
}
export class RepositoryError extends AppError {
  constructor(message: string) {
    super(message, 500, "ERROR_DE_REPOSITORIO");
  }
}