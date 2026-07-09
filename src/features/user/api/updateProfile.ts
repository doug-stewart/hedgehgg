import { authClient } from "../../auth/lib/auth-client";
import type { User } from "../types";

export const updateProfile = async (profile: NonNullable<User>): Promise<User> => {
  try {
    const { data: session, error } = await authClient.getSession();

    if (error || !session?.user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`/api/profile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
