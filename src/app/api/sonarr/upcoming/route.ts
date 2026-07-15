import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import { getCurrentUserSonarr, getSonarrUpcoming } from "@/server/services/sonarrService";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    const creds = await getCurrentUserSonarr(user.id);
    const upcoming = await getSonarrUpcoming(creds.url, creds.api_key);
    return NextResponse.json(upcoming);
  } catch (error) {
    return toErrorResponse(error);
  }
}
