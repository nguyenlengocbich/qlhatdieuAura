import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const section = await prisma.siteSection.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!section) {
      return NextResponse.json(
        { error: "Không tìm thấy section" },
        { status: 404 }
      );
    }

    const items = await prisma.siteItem.findMany({
      where: {
        sectionKey: section.key,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Không thể lấy danh sách item" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const section = await prisma.siteSection.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!section) {
      return NextResponse.json(
        { error: "Không tìm thấy section" },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Tiêu đề item không được để trống" },
        { status: 400 }
      );
    }

    const lastItem = await prisma.siteItem.findFirst({
      where: {
        sectionKey: section.key,
      },
      orderBy: {
        sortOrder: "desc",
      },
    });

    const item = await prisma.siteItem.create({
      data: {
        sectionKey: section.key,
        title: body.title.trim(),
        description: body.description?.trim() || null,
        icon: body.icon || null,
        image: body.image || null,
        sortOrder: lastItem
          ? lastItem.sortOrder + 1
          : 1,
        status: body.status || "published",
      },
    });

    return NextResponse.json(item, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Không thể thêm item" },
      { status: 500 }
    );
  }
}