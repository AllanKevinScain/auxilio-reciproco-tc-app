import { baseURLAPI } from "@/helpers";

export async function GET() {
  const res = await fetch(`${baseURLAPI()}/grantee`, {
    method: "GET",
    headers: {
      "api-key": process.env.API_KEY,
    },
    cache: "no-store",
  });
  const data = await res.json();

  return Response.json(data);
}
