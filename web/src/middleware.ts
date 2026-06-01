import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/products", "/quotation"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!isProtected) return NextResponse.next();

  const session = req.cookies.get("dealer_session")?.value;
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/quotation/:path*"],
};
