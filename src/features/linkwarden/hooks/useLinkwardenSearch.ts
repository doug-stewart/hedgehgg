import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/features/auth/hooks/useSession";
import type { LinkwardenLink } from "@/features/linkwarden/types";
import { useProfile } from "@/features/user/hooks/useProfile";

export const useLinkwardenSearch = (query: string): { results: Array<LinkwardenLink> } => {
  const { session, isLoggedIn } = useSession();
  const { profile } = useProfile();

  const searchQuery = useQuery({
    queryKey: ["user", session?.id, "search", query],
    queryFn: async () => {
      const response = await fetch(`/api/sonarr/upcoming`, {
        credentials: "include",
      });
      const data = await response.json();
      return data as Array<LinkwardenLink>;
    },
    enabled: isLoggedIn && !!query && !!profile?.linkwarden_url,
    staleTime: Infinity,
  });

  return { results: searchQuery.data instanceof Error ? [] : (searchQuery.data ?? []) };
};
