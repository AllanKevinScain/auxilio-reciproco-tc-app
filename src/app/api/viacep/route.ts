import { httpException } from "@/helpers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cep = searchParams.get("cep");

  const req = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    method: "GET",
  });

  httpException(req);

  const res = await req.json();

  return Response.json(res);
}
