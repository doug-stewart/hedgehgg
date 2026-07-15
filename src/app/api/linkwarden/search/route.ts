import { type NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/require-user";
import { toErrorResponse } from "@/server/errors/toErrorResponse";
import {
  getCurrentUserLinkwarden,
  getLinkwardenSearchResults,
} from "@/server/services/linkwardenService";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");
    if (!query) {
      return NextResponse.json({ error: "Missing 'q' query parameter" }, { status: 400 });
    }
    const user = await requireUser();
    const creds = await getCurrentUserLinkwarden(user.id);
    const links = await getLinkwardenSearchResults(creds.url, creds.token, query);
    return NextResponse.json(links);
  } catch (error) {
    return toErrorResponse(error);
  }
}
