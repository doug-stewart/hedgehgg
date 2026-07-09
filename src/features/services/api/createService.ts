import type { Service } from "../types";

export const createService = async (
  service: NonNullable<Service>,
): Promise<Service> => {
  const response = await fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service),
  });
  return (await response.json()) as Service;
};
