"use client";

import type { ErrorContext } from "better-auth/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { authClient } from "../lib/auth-client";
import type { SessionResult } from "../types";

export const useSession = (): SessionResult => {
  const router = useRouter();
  const { data, isPending, refetch } = authClient.useSession();

  const signup = useCallback(
    async (email: string) => {
      let result: ErrorContext | undefined;

      await authClient.passkey.addPasskey({
        name: "Primary Passkey",
        context: email,
        fetchOptions: {
          async onSuccess() {
            await refetch();
          },
          onError(context) {
            result = context;
          },
        },
      });

      return result;
    },
    [refetch],
  );

  const login = useCallback(async () => {
    let result: ErrorContext | undefined;

    await authClient.signIn.passkey({
      fetchOptions: {
        async onSuccess() {
          await refetch();
        },
        onError(context) {
          result = context;
        },
      },
    });

    if (result?.error.code === "PASSKEY_NOT_FOUND") {
      console.log("ERROR: User does not exist with this passkey");
    }

    return result;
  }, [refetch]);

  const logout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const isLoggedIn = !!data?.session;

  if (isLoggedIn) {
    return {
      isLoggedIn: true,
      session: data.session,
      isPending,
      refetch,
      login,
      signup,
      logout,
    };
  }

  return {
    isLoggedIn: false,
    session: null,
    isPending,
    refetch,
    login,
    signup,
    logout,
  };
};
