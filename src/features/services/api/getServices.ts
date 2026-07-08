import { BACKEND_API } from "../../../config";
import { authClient } from "../../auth/lib/auth-client";
import type { Services } from "../types";

export const getServices = async (): Promise<Services> => {
  try {
    const { data: session, error } = await authClient.getSession();

    if (error || !session?.user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${BACKEND_API}/services/${session.user.id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error getting service:", error);
    throw error;
  }
};
