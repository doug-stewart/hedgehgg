import { NextResponse } from "next/server";

// Proxies Google's search autocomplete for the dashboard search box. No auth.
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = (await response.json()) as Array<unknown>;
    return NextResponse.json((data[1] as Array<string>) ?? []);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 },
    );
  }
}
