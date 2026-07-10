import type { Service, Services } from "../types";

export const reorderServices = async (ids: Array<Service["id"]>): Promise<Services> => {
  const response = await fetch("/api/services/order", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return (await response.json()) as Services;
};
