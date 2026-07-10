"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useNotificationsActions } from "@/features/notifications/store/notifications.store";
import { authClient } from "../lib/auth-client";
import type { SessionResult } from "../types";

export const useSession = (): SessionResult => {
  const router = useRouter();
  const { data, isPending, refetch } = authClient.useSession();
  const { addNotification } = useNotificationsActions();

  const signup = useCallback(
    async (email: string) => {
      await authClient.passkey.addPasskey({
        context: email,
        fetchOptions: {
          async onSuccess() {
            await refetch();
          },
          onError(context) {
            addNotification({
              type: "error",
              message: context.error.message ?? "Could not create your account",
            });
          },
        },
      });
    },
    [refetch, addNotification],
  );

  const login = useCallback(async () => {
    const result = await authClient.signIn.passkey({
      extensions: { credProps: true },
    });

    if (result.error === null) {
      router.push("/nest");
      return;
    }

    const message =
      "code" in result.error && result.error.code === "PASSKEY_NOT_FOUND"
        ? "No account found for this passkey"
        : (result.error.message ?? "Could not log you in");

    addNotification({ type: "error", message });
  }, [router, addNotification]);

  const logout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const isLoggedIn = !!data?.session;

  const sharedReturnProps = {
    isPending,
    refetch,
    login,
    signup,
    logout,
  };

  if (isLoggedIn) {
    return {
      isLoggedIn: true,
      session: data.session,
      ...sharedReturnProps,
    };
  }

  return {
    isLoggedIn: false,
    session: null,
    ...sharedReturnProps,
  };
};
