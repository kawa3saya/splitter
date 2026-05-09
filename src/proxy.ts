import { NextResponse, NextRequest } from "next/server";

const ALLOWED_PATTERNS = [
  (pathname: string) => pathname === "/",
  (pathname: string) => pathname === "/trips",
  (pathname: string) => pathname === "/trips/new",
  (pathname: string) => pathname === "/terms",
  (pathname: string) => pathname === "/privacy",
  (pathname: string) => /^\/trips\/[^/]+\/share$/.test(pathname),
  (pathname: string) => /^\/trips\/[^/]+\/edit$/.test(pathname),
  (pathname: string) => /^\/trips\/[^/]+\/settlement$/.test(pathname),
  (pathname: string) => /^\/trips\/[^/]+$/.test(pathname),
];

function isAllowedPath(pathname: string): boolean {
  return ALLOWED_PATTERNS.some((fn) => fn(pathname));
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (isAllowedPath(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
