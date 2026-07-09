import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { BadRequestError } from "@/server/errors/AppError";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import { serviceBodySchema } from "@/server/schemas/service.schema";
import * as servicesService from "@/server/services/servicesService";

export const runtime = "nodejs";

type Context = { params: Promise<{ serviceId: string }> };

const parseServiceId = (raw: string): number => {
  const id = Number(raw);
  if (!Number.isInteger(id)) {
    throw new BadRequestError("Invalid service ID");
  }
  return id;
};

export async function GET(_request: Request, { params }: Context) {
  try {
    const user = await requireUser();
    const { serviceId } = await params;
    const service = await servicesService.getService(
      user.id,
      parseServiceId(serviceId),
    );
    return NextResponse.json(service);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PUT(request: Request, { params }: Context) {
  try {
    const user = await requireUser();
    const { serviceId } = await params;
    const body = serviceBodySchema.parse(await request.json());
    const updated = await servicesService.updateService(
      user.id,
      parseServiceId(serviceId),
      body,
    );
    return NextResponse.json(updated);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  try {
    const user = await requireUser();
    const { serviceId } = await params;
    const deleted = await servicesService.deleteService(
      user.id,
      parseServiceId(serviceId),
    );
    return NextResponse.json({ message: "Service deleted successfully", deleted });
  } catch (error) {
    return toErrorResponse(error);
  }
}
