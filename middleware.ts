import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session")?.value;

  if (pathname === "/admin/login" && session) {
    const response = NextResponse.redirect(
      new URL("/admin", request.url)
    );

    response.headers.set(
      "Cache-Control",
      "private, no-store, no-cache, max-age=0, must-revalidate"
    );

    return response;
  }

  if (pathname === "/admin/login") {
    const response = NextResponse.next();

    response.headers.set(
      "Cache-Control",
      "private, no-store, no-cache, max-age=0, must-revalidate"
    );

    return response;
  }

  if (pathname.startsWith("/admin") && !session) {
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    response.headers.set(
      "Cache-Control",
      "private, no-store, no-cache, max-age=0, must-revalidate"
    );

    return response;
  }

  const response = NextResponse.next();

  response.headers.set(
    "Cache-Control",
    "private, no-store, no-cache, max-age=0, must-revalidate"
  );

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};