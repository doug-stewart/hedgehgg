import { passkeyClient } from "@better-auth/passkey/client";
import { createAuthClient } from "better-auth/react";
import { BACKEND_API } from "../../../config";

export const authClient = createAuthClient({
  baseURL: BACKEND_API,
  plugins: [passkeyClient()],
  fetchOptions: { credentials: "include" },
});
