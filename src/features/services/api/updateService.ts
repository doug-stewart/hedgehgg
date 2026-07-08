import { BACKEND_API } from "../../../config";
import { authClient } from "../../auth/lib/auth-client";
import type { Service } from "../types";

export const updateService = async (service: NonNullable<Service>): Promise<Service> => {
  try {
    const { data: session, error } = await authClient.getSession();

    if (error || !session?.user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${BACKEND_API}/services/${session.user.id}/${service.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(service),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error editing service:", error);
    throw error;
  }
};
