import { useQuery } from "@tanstack/react-query";
import { BACKEND_API } from "../config";
import { useSession } from "../features/auth/hooks/useSession";
import type { Episodes } from "../types";

export const useSonarr = () => {
  const { session, isLoggedIn } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["user", session.session.id, "sonarr"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_API}/sonarr/upcoming`, {
        credentials: "include",
      });
      const data = await response.json();
      return data as Episodes;
    },
    staleTime: Infinity,
    enabled: isLoggedIn,
  });
  return { upcoming: Array.isArray(data) ? data : [], isLoading };
};
