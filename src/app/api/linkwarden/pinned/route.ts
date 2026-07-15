import { NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import {
  getCurrentUserLinkwarden,
  getLinkwardenPinnedLinks,
} from "@/server/services/linkwardenService";

export const runtime = "nodejs";

export async function GET() {
  try {
    const user = await requireUser();
    const creds = await getCurrentUserLinkwarden(user.id);
    const links = await getLinkwardenPinnedLinks(creds.url, creds.token);
    return NextResponse.json(links);
  } catch (error) {
    return toErrorResponse(error);
  }
}
