import { type UseMutationResult, useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "../../auth/hooks/useSession";
import { getProfile } from "../api/getProfile";
import { updateProfile } from "../api/updateProfile";
import type { User } from "../types";

type Profile = {
  profile: User | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  query: ReturnType<typeof useQuery>;
  saveProfile: UseMutationResult<User, Error, NonNullable<User>, unknown>;
};

export const useProfile = (): Profile => {
  const { session, isLoggedIn } = useSession();

  const user = session?.user;

  const userQuery = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => getProfile(user?.id ?? ""),
    staleTime: Infinity,
    enabled: isLoggedIn,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
  });

  const profile = {
    id: user?.id,
    linkwarden_token: userQuery.data?.linkwarden_token ?? null,
    linkwarden_url: userQuery.data?.linkwarden_url ?? null,
    sonarr_api_key: userQuery.data?.sonarr_api_key ?? null,
    sonarr_url: userQuery.data?.sonarr_url ?? null,
    geolocation_latitude: userQuery.data?.geolocation_latitude ?? null,
    geolocation_longitude: userQuery.data?.geolocation_longitude ?? null,
    theme: userQuery.data?.theme ?? null,
  } as User;

  return {
    profile: profile,
    isLoading: userQuery.isLoading,
    isSuccess: userQuery.isSuccess,
    isError: userQuery.isError,
    query: userQuery,
    saveProfile: updateMutation,
  };
};
