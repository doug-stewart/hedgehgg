import type { Service } from "../types";

export const deleteService = async (
  serviceId: Service["id"],
): Promise<Service> => {
  const response = await fetch(`/api/services/${serviceId}`, {
    method: "DELETE",
  });
  return (await response.json()) as Service;
};
