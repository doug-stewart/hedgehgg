"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "../../auth/hooks/useSession";
import { createService } from "../api/createService";
import { deleteService } from "../api/deleteService";
import { getServices } from "../api/getServices";
import { reorderServices } from "../api/reorderServices";
import { updateService } from "../api/updateService";
import type { Service, Services, UseServicesResult } from "../types";

export const useServices = (): UseServicesResult => {
  const { session, isLoggedIn } = useSession();
  const queryClient = useQueryClient();

  const servicesQueryKey = ["user", session?.id, "services"];

  const servicesQuery = useQuery({
    queryKey: servicesQueryKey,
    queryFn: getServices,
    enabled: isLoggedIn,
    staleTime: Infinity,
  });

  const createMutation = useMutation({
    mutationKey: servicesQueryKey,
    mutationFn: createService,
  });
  const deleteMutation = useMutation({
    mutationKey: servicesQueryKey,
    mutationFn: deleteService,
  });
  const updateMutation = useMutation({
    mutationKey: servicesQueryKey,
    mutationFn: updateService,
  });

  const reorderMutation = useMutation({
    mutationKey: servicesQueryKey,
    mutationFn: reorderServices,
    // Apply the new order to the cache immediately, otherwise the dragged item
    // springs back to its old slot until the request resolves.
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: servicesQueryKey });
      const previous = queryClient.getQueryData<Services>(servicesQueryKey);

      if (previous) {
        const byId = new Map(previous.map((service) => [service.id, service]));
        queryClient.setQueryData<Services>(
          servicesQueryKey,
          ids
            .map((id) => byId.get(id))
            .filter((service): service is Service => service !== undefined),
        );
      }

      return { previous };
    },
    onError: (_error, _ids, context) => {
      if (context?.previous) {
        queryClient.setQueryData(servicesQueryKey, context.previous);
      }
    },
  });

  return {
    services: (servicesQuery.data ?? []) as Services,
    isLoading: servicesQuery.isLoading,
    createService: createMutation,
    updateService: updateMutation,
    deleteService: deleteMutation,
    reorderServices: reorderMutation,
  };
};
