"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "../../auth/hooks/useSession";
import { createService } from "../api/createService";
import { deleteService } from "../api/deleteService";
import { getServices } from "../api/getServices";
import { updateService } from "../api/updateService";
import type { ServiceMutation, Services } from "../types";

type UseServicesResult = {
  services: Services;
  isLoading: boolean;
  createService: ServiceMutation;
  updateService: ServiceMutation;
  deleteService: ServiceMutation;
};

export const useServices = (): UseServicesResult => {
  const { session, isLoggedIn } = useSession();

  const servicesQuery = useQuery({
    queryKey: ["user", session?.user?.id, "services"],
    queryFn: getServices,
    enabled: isLoggedIn,
    staleTime: Infinity,
  });

  const createMutation = useMutation({ mutationFn: createService });
  const deleteMutation = useMutation({ mutationFn: deleteService });
  const updateMutation = useMutation({ mutationFn: updateService });

  return {
    services: (servicesQuery.data ?? []) as Services,
    isLoading: servicesQuery.isLoading,
    createService: createMutation,
    updateService: updateMutation,
    deleteService: deleteMutation,
  };
};
