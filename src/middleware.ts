import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");

  if (token?.value) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", req.url));
}
export const config = {
  matcher: "/dashboard/:path*",
};
