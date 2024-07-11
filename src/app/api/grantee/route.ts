import { baseURLAPI } from "@/helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const res = await fetch(`${baseURLAPI()}/grantee/${id}`, {
    method: "GET",
    headers: {
      "api-key": process.env.API_KEY,
    },
    cache: "no-store",
  });
  const data = await res.json();

  return Response.json(data);
}

export async function PUT(request: NextRequest) {
  const body = request.body;
  console.log("🚀 ~ PUT ~ body:", body);

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const res = await fetch(`${baseURLAPI()}/grantee/${id}`, {
    method: "PUT",
    headers: {
      "api-key": process.env.API_KEY,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return Response.json(data);
}
