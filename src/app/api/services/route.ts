import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import { serviceBodySchema } from "@/server/schemas/service.schema";
import * as servicesService from "@/server/services/servicesService";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    return NextResponse.json(await servicesService.listServices(user.id));
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = serviceBodySchema.parse(await request.json());
    const created = await servicesService.createService(user.id, body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
