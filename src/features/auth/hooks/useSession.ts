import type { ErrorContext } from "better-auth/client";
import { useCallback } from "react";
import { authClient } from "../lib/auth-client";
import type { SessionResult } from "../types";

export const useSession = (): SessionResult => {
  const { data: session, isPending, refetch } = authClient.useSession();

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

    return result;
  }, [refetch]);

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

  const logout = async () => {
    await authClient.signOut();
  };

  const isLoggedIn = !!session?.user && !!session?.session;

  if (isLoggedIn) {
    return {
      isLoggedIn: true,
      session: session,
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
