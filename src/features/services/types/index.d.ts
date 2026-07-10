import type { UseMutationResult } from "@tanstack/react-query";

export type Service = {
  id: number;
  name: string;
  user_id: string;
  abbr: string;
  href: string;
  icon: string | null;
  sort_order: number;
};

export type Services = Array<Service>;

export type IconData = {
  Name: string;
  Reference: string;
  SVG: string;
  PNG: string;
  WebP: string;
  Light: string;
  Dark: string;
  Category: string;
  Tags: string;
  CreatedAt: Date;
};

export type CreateServiceMutation = UseMutationResult<Service, Error, Service, unknown>;
export type DeleteServiceMutation = UseMutationResult<Service, Error, number, unknown>;
export type UpdateServiceMutation = UseMutationResult<Service, Error, Service, unknown>;

export type ReorderContext = { previous?: Services };

export type ReorderMutation = UseMutationResult<
  Services,
  Error,
  Array<Service["id"]>,
  ReorderContext
>;

export type UseServicesResult = {
  services: Services;
  isLoading: boolean;
  createService: CreateServiceMutation;
  updateService: UpdateServiceMutation;
  deleteService: DeleteServiceMutation;
  reorderServices: ReorderMutation;
};
