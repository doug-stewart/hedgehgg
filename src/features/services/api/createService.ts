import { BACKEND_API } from "../../../config";
import { authClient } from "../../auth/lib/auth-client";
import type { Service } from "../types";

export const createService = async (service: NonNullable<Service>): Promise<Service> => {
  try {
    const { data: session, error } = await authClient.getSession();

    if (error || !session?.user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${BACKEND_API}/services/${session.user.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error saving service:", error);
    throw error;
  }
};
