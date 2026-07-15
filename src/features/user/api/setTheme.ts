import { authClient } from "../../auth/lib/auth-client";
import type { ThemeValue } from "../types";

export const setTheme = async (theme: ThemeValue): Promise<ThemeValue> => {
  try {
    const { data: session, error } = await authClient.getSession();

    if (error || !session?.user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`/api/profile/theme`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error setting theme:", error);
    throw error;
  }
};
