import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import { serviceOrderBodySchema } from "@/server/schemas/service.schema";
import * as servicesService from "@/server/services/servicesService";

export const runtime = "nodejs";

// Reorders the whole list. Distinct from PUT /api/services/[serviceId], which
// rewrites one service's fields. The static segment takes precedence over the
// dynamic one, so "order" never reaches that route.
export async function PUT(request: Request) {
  try {
    const user = await requireUser();
    const { ids } = serviceOrderBodySchema.parse(await request.json());
    const services = await servicesService.reorderServices(user.id, ids);
    return NextResponse.json(services);
  } catch (error) {
    return toErrorResponse(error);
  }
}
