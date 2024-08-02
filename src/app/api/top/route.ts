import { auth } from "@/app/auth";

export async function GET() {
  const session = await auth();
  const queryParams = new URLSearchParams({
    time_range: "short_term",
    limit: "9",
  });
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?${queryParams}`,
    {
      headers: { Authorization: `Bearer ${session?.access_token}` },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
