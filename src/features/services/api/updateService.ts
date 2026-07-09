import type { Service } from "../types";

export const updateService = async (
  service: NonNullable<Service>,
): Promise<Service> => {
  const response = await fetch(`/api/services/${service.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
  return (await response.json()) as Service;
};
