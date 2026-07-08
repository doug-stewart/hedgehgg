import { BACKEND_API } from "../../../config";
import { authClient } from "../../auth/lib/auth-client";
import type { Service } from "../types";

export const deleteService = async (serviceId: Service["id"]): Promise<Service> => {
  try {
    const { data: session, error } = await authClient.getSession();

    if (error || !session?.user) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(`${BACKEND_API}/services/${session.user.id}/${serviceId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
