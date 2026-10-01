import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sections = await prisma.siteSection.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Không thể lấy dữ liệu section",
      },
      {
        status: 500,
      }
    );
  }
}