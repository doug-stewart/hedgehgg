"use client";

import { type UseMutationResult, useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "../../auth/hooks/useSession";
import { getProfile } from "../api/getProfile";
import { updateProfile } from "../api/updateProfile";
import { normalizeProfile } from "../helpers/normalizeProfile";
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

  const userQuery = useQuery({
    queryKey: ["user", session?.id],
    queryFn: async () => getProfile(),
    staleTime: Infinity,
    enabled: isLoggedIn,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
  });

  const profile = normalizeProfile(session?.id, userQuery.data);

  return {
    profile: profile,
    isLoading: userQuery.isLoading,
    isSuccess: userQuery.isSuccess,
    isError: userQuery.isError,
    query: userQuery,
    saveProfile: updateMutation,
  };
};
