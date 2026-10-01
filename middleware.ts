import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session")?.value;

  console.log(
    "[ADMIN MIDDLEWARE]",
    pathname,
    "session:",
    session ? "YES" : "NO"
  );

  if (pathname === "/admin/login" && session) {
    console.log("[ADMIN MIDDLEWARE] Redirect login -> admin");

    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !session) {
    console.log("[ADMIN MIDDLEWARE] NO SESSION -> login");

    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  console.log("[ADMIN MIDDLEWARE] ALLOW ADMIN");

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};