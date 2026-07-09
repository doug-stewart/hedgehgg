import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AppError } from "./AppError";

// Central error translator for route handlers. Mirrors the old Express
// errorHandler: ZodError -> 400 with details, AppError -> its status, anything
// else -> 500. Wrap each handler body in try/catch and return this on error.
export function toErrorResponse(err: unknown): NextResponse {
  if (err instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  if (err instanceof AppError) {
    return NextResponse.json(
      { error: err.expose ? err.message : "Internal Server Error" },
      { status: err.status },
    );
  }

  console.error("ERROR::Unhandled error:", err);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
