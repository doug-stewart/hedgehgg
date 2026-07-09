import { headers } from "next/headers";
import { UnauthorizedError } from "@/server/errors/AppError";
import { auth } from "./auth";

// Route-handler guard replacing the old Express requireAuth/requireSelf. Reads
// the session from the request cookies; throws Unauthorized (→ 401 via
// toErrorResponse) when there is none. The returned user's id is the
// authenticated user, so handlers no longer take a :userId path param.
export async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new UnauthorizedError();
  }
  return session.user;
}
