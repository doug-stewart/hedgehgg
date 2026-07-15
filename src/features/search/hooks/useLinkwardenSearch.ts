import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/features/auth/hooks/useSession";
import type { Link } from "@/features/bookmarks/types";
import { useProfile } from "@/features/user/hooks/useProfile";

export const useLinkwardenSearch = (query: string): { results: Array<Link> } => {
  const { session, isLoggedIn } = useSession();
  const { profile } = useProfile();

  const searchQuery = useQuery({
    queryKey: ["user", session?.id, "search", query],
    queryFn: async () => {
      const response = await fetch(`/api/sonarr/upcoming`, {
        credentials: "include",
      });
      const data = await response.json();
      return data as Array<Link>;
    },
    enabled: isLoggedIn && !!query && !!profile?.linkwarden_url,
    staleTime: Infinity,
  });

  return { results: searchQuery.data instanceof Error ? [] : (searchQuery.data ?? []) };
};
