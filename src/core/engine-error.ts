export class EngineError extends Error {
  public readonly key: string;
  public readonly params: Record<string, string>;
  public readonly statusCode: number;
  public readonly details: unknown;

  constructor(
    key: string,
    message: string,
    params: Record<string, string>,
    statusCode: number,
    details?: unknown,
  ) {
    super(message);
    this.key = key;
    this.name = key;
    this.params = params;
    this.statusCode = statusCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
