import { passkeyClient } from "@better-auth/passkey/client";
import { createAuthClient } from "better-auth/react";

// Same-origin now (the API is served by this Next app), so baseURL defaults to
// the current origin and session cookies are sent automatically.
export const authClient = createAuthClient({
  plugins: [passkeyClient()],
});
