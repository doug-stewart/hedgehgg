"use client";

import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useSession } from "../features/auth/hooks/useSession";
import type { Episodes } from "../types";

export const useSonarr = () => {
  const { session, isLoggedIn } = useSession();
  const { profile } = useProfile();
  const hasSonarr = Object.hasOwn(profile || {}, "sonarr_api_key");

  const { data, isLoading } = useQuery({
    queryKey: ["user", session.id, "sonarr"],
    queryFn: async () => {
      const response = await fetch(`/api/sonarr/upcoming`, {
        credentials: "include",
      });
      const data = await response.json();
      return data as Episodes;
    },
    staleTime: Infinity,
    enabled: isLoggedIn && hasSonarr,
  });
  return { upcoming: Array.isArray(data) ? data : [], isLoading };
};
