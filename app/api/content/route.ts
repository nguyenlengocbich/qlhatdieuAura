import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sections = await prisma.siteSection.findMany({ orderBy: { sortOrder: "asc" } });
    const hero = sections.find((section) => section.key === "hero");
    return NextResponse.json({ hero, sections });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Không thể lấy nội dung website" }, { status: 500 });
  }
}
