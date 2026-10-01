import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = Number(id);

    if (!Number.isInteger(itemId)) {
      return NextResponse.json(
        { error: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const item = await prisma.siteItem.update({
      where: {
        id: itemId,
      },
      data: {
        title: body.title,
        description: body.description || null,
        icon: body.icon || null,
        image: body.image || null,
        sortOrder: Number(body.sortOrder) || 0,
        status: body.status || "published",
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Không thể cập nhật item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itemId = Number(id);

    if (!Number.isInteger(itemId)) {
      return NextResponse.json(
        { error: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    await prisma.siteItem.delete({
      where: {
        id: itemId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Không thể xóa item" },
      { status: 500 }
    );
  }
}