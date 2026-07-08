import { BACKEND_API } from "../../../config";
import type { User } from "../types";

export const getProfile = async (userId: string) => {
  const response = await fetch(`${BACKEND_API}/profile/${userId}`, {
    credentials: "include",
  });
  const data = await response.json();
  return data as User;
};
