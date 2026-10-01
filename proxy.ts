import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("admin_session")?.value;

  console.log(
    "[ADMIN PROXY]",
    request.method,
    pathname,
    "session:",
    session ? "YES" : "NO"
  );

  if (pathname === "/admin/login" && session) {
    console.log("[ADMIN PROXY] Redirect login -> /admin");

    const response = NextResponse.redirect(
      new URL("/admin", request.url)
    );

    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0, must-revalidate"
    );

    return response;
  }

  if (pathname === "/admin/login") {
    console.log("[ADMIN PROXY] Allow /admin/login");
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !session) {
    console.log("[ADMIN PROXY] No session -> /admin/login");

    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0, must-revalidate"
    );

    return response;
  }

  console.log("[ADMIN PROXY] Allow:", pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
