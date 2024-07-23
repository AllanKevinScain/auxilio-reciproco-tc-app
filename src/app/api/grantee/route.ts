import { baseURLAPI, httpException } from "@/helpers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const req = await fetch(`${baseURLAPI()}/grantee/${id}`, {
    method: "GET",
    headers: {
      "api-key": process.env.API_KEY,
    },
    cache: "no-store",
  });

  httpException(req);

  const res = await req.json();

  return Response.json(res);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const req = await fetch(`${baseURLAPI()}/grantee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.API_KEY,
    },
    body: JSON.stringify(body),
  });

  httpException(req);

  const res = await req.json();

  return Response.json(res);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const req = await fetch(`${baseURLAPI()}/grantee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.API_KEY,
    },
    body: JSON.stringify(body),
  });

  httpException(req);

  const res = await req.json();

  return Response.json(res);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const req = await fetch(`${baseURLAPI()}/grantee/${id}`, {
    method: "DELETE",
    headers: {
      "api-key": process.env.API_KEY,
    },
  });

  httpException(req);

  return Response.json(req.status);
}
