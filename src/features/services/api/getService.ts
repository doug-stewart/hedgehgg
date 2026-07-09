import type { Service } from "../types";

export const getService = async (serviceId: Service["id"]): Promise<Service> => {
  const response = await fetch(`/api/services/${serviceId}`);
  return (await response.json()) as Service;
};
