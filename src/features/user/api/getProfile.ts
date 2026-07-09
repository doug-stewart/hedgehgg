import type { User } from "../types";

export const getProfile = async () => {
  const response = await fetch("/api/profile", {
    credentials: "include",
  });
  const data = await response.json();
  return data as User;
};
