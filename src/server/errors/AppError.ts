// Base class for errors that map to an HTTP response. Throw these from
// services/route handlers; toErrorResponse translates them into a Response.
export class AppError extends Error {
  readonly status: number;
  // When false the message is hidden from clients (generic 500 text is sent).
  readonly expose: boolean;

  constructor(message: string, status = 500, expose = true) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.expose = expose;
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}
