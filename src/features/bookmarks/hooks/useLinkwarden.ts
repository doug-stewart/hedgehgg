import { useQuery } from "@tanstack/react-query";
import { BACKEND_API } from "../../../config";
import { useSession } from "../../auth/hooks/useSession";
import type { Bookmarks } from "../types";

type LinkwardenStore = {
  bookmarks: Bookmarks | [];
  isLoading: boolean;
  isSuccess: boolean;
};

export const useLinkwarden = (): LinkwardenStore => {
  const { session, isLoggedIn } = useSession();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user", session.session.id, "bookmarks"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_API}/linkwarden/all`, {
        credentials: "include",
      });
      const data = await response.json();
      return data as Error | Bookmarks;
    },
    staleTime: Infinity,
    enabled: isLoggedIn,
  });

  const bookmarks =
    data instanceof Error
      ? []
      : Array.isArray(data)
        ? data
            .sort((a, b) => {
              if (a.name === "Unorganized") return -1;
              if (b.name === "Unorganized") return 1;
              return a.name.localeCompare(b.name);
            })
            .map((collection) => {
              collection.links.sort((a, b) => a.name.localeCompare(b.name));
              return collection;
            })
        : [];

  return {
    bookmarks,
    isLoading,
    isSuccess,
  };
};
