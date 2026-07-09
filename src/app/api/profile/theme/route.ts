import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import { updateThemeSchema } from "@/server/schemas/profile.schema";
import * as profileService from "@/server/services/profileService";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    const user = await requireUser();
    const body = updateThemeSchema.parse(await request.json());
    const profile = await profileService.updateTheme(user.id, body);
    return NextResponse.json(profile);
  } catch (error) {
    return toErrorResponse(error);
  }
}
