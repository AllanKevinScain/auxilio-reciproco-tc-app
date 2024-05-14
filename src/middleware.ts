import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authtcCookie = request.cookies.get("authtc.data");
  const cookieValue = authtcCookie?.value;
  const loginPage = request.nextUrl.pathname.startsWith("/login");

  if (cookieValue === undefined) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (cookieValue !== undefined && loginPage) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/login"],
};
