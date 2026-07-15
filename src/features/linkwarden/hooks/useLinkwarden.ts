"use client";

import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useSession } from "../../auth/hooks/useSession";
import type { LinkwardenCollection } from "../types";

type LinkwardenStore = {
  bookmarks: Array<LinkwardenCollection>;
  isLoading: boolean;
  isSuccess: boolean;
};

export const useLinkwarden = (): LinkwardenStore => {
  const { session, isLoggedIn } = useSession();
  const { profile } = useProfile();
  const hasLinkwarden = Object.hasOwn(profile || {}, "linkwarden_token");

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user", session?.id, "linkwarden", "links"],
    queryFn: async () => {
      const response = await fetch(`/api/linkwarden/all`, {
        credentials: "include",
      });
      const data = await response.json();
      return data as Error | Array<LinkwardenCollection>;
    },
    staleTime: Infinity,
    enabled: isLoggedIn && hasLinkwarden,
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
