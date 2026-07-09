import { NotFoundError } from "../errors/AppError";
import * as servicesRepository from "../repositories/servicesRepository";
import type { ServiceBody } from "../schemas/service.schema";

export const listServices = (userId: string) =>
  servicesRepository.listByUser(userId);

export const getService = async (userId: string, id: number) => {
  const service = await servicesRepository.findByIdForUser(id, userId);
  if (!service) {
    throw new NotFoundError("Service not found");
  }
  return service;
};

export const createService = (userId: string, body: ServiceBody) =>
  servicesRepository.create({
    user_id: userId,
    name: body.name,
    href: body.href,
    abbr: body.abbr,
    icon: body.icon ?? null,
  });

export const updateService = async (
  userId: string,
  id: number,
  body: ServiceBody,
) => {
  const updated = await servicesRepository.updateForUser(id, userId, {
    name: body.name,
    href: body.href,
    abbr: body.abbr,
    icon: body.icon ?? null,
  });
  if (!updated) {
    throw new NotFoundError("Service not found");
  }
  return updated;
};

export const deleteService = async (userId: string, id: number) => {
  const deleted = await servicesRepository.removeForUser(id, userId);
  if (!deleted) {
    throw new NotFoundError("Service not found");
  }
  return deleted;
};
