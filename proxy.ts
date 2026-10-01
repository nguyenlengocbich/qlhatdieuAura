import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cho phép trang đăng nhập
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Chỉ xử lý các route /admin
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");

    // Chưa đăng nhập
    if (!session?.value) {
      const loginUrl = new URL("/admin/login", request.url);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};