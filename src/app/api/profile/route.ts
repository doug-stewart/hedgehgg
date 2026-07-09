import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import { updateProfileSchema } from "@/server/schemas/profile.schema";
import * as profileService from "@/server/services/profileService";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    return NextResponse.json(await profileService.getProfile(user.id));
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireUser();
    const body = updateProfileSchema.parse(await request.json());
    const profile = await profileService.saveProfile(user.id, body);
    return NextResponse.json(profile);
  } catch (error) {
    return toErrorResponse(error);
  }
}
