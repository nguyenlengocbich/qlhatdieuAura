import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    const password = String(body.password ?? "");
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng nhập đầy đủ email và mật khẩu.",
        },
        { status: 400 }
      );
    }
    const admin = await prisma.adminUser.findUnique({
      where: {
        email,
      },
    });
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Email hoặc mật khẩu không chính xác.",
        },
        { status: 401 }
      );
    }
    if (admin.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          message: "Tài khoản Admin hiện đang bị khóa.",
        },
        { status: 403 }
      );
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.passwordHash
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Email hoặc mật khẩu không chính xác.",
        },
        { status: 401 }
      );
    }
    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công.",
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
    response.cookies.set("admin_session", String(admin.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 giờ
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Đã xảy ra lỗi khi đăng nhập.",
      },
      { status: 500 }
    );
  }
}