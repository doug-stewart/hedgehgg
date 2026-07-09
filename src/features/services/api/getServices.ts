import type { Services } from "../types";

export const getServices = async (): Promise<Services> => {
  const response = await fetch("/api/services");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};
