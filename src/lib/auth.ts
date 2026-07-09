import { passkey } from "@better-auth/passkey";
import { betterAuth } from "better-auth";
import { setSessionCookie } from "better-auth/cookies";
import { admin } from "better-auth/plugins";
import { PostgresDialect } from "kysely";
// Relative import (not the "@/" alias) so the Better-Auth CLI's loader can
// resolve it when running `pnpm auth:migrate`.
import { pool } from "../server/db/pool";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  // Share the single Neon pool with Kysely; the explicit dialect avoids any
  // driver auto-detection ambiguity with the Neon serverless Pool.
  database: {
    dialect: new PostgresDialect({ pool }),
    type: "postgres",
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: { ...user, role: user.role ?? "user" },
        }),
      },
    },
  },
  plugins: [
    admin(),
    passkey({
      rpID: process.env.NEXT_PUBLIC_SITE_URL ?? "localhost",
      rpName: "Hedge.gg",
      registration: {
        requireSession: false,
        extensions: { credProps: true },
        resolveUser: async ({ ctx, context }) => {
          if (typeof context !== "string" || !context.includes("@")) {
            throw new Error("context must be a valid email address");
          }

          const existing = await ctx.context.internalAdapter.findUserByEmail(context);

          if (existing) return existing.user;

          return ctx.context.internalAdapter.createUser({
            name: context,
            email: context,
          });
        },
        afterVerification: async ({ ctx, user }) => {
          const fullUser = await ctx.context.internalAdapter.findUserById(user.id);
          if (!fullUser) return;
          const session = await ctx.context.internalAdapter.createSession(fullUser.id);
          if (!session) return;
          await setSessionCookie(ctx, { session, user: fullUser });
        },
      },
      authentication: {
        extensions: { credProps: true },
      },
    }),
  ],
});
