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
        {
          error: "Không tìm thấy section",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(section);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Không thể lấy section",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const section = await prisma.siteSection.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        content: body.content,
        image: body.image,
        status: body.status,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Không thể cập nhật section",
      },
      {
        status: 500,
      }
    );
  }
}