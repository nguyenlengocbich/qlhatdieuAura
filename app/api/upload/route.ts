import { NextResponse } from "next/server";
import path from "node:path";
import { mkdir, readdir, stat, unlink, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export async function GET() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });

    const names = await readdir(UPLOAD_DIR);
    const files = [];

    for (const name of names) {
      const filePath = path.join(UPLOAD_DIR, name);

      try {
        const info = await stat(filePath);
        if (!info.isFile()) continue;

        files.push({
          name,
          url: `/uploads/${encodeURIComponent(name)}`,
          size: info.size,
          updatedAt: info.mtime.toISOString(),
        });
      } catch {
        // Ignore a file that disappears while listing.
      }
    }

    files.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime()
    );

    return NextResponse.json(files);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Không thể đọc thư viện ảnh" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Vui lòng chọn một hình ảnh" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error:
            "Định dạng không hợp lệ. Chỉ hỗ trợ JPG, PNG, WEBP và GIF.",
        },
        { status: 400 }
      );
    }

    if (file.size <= 0) {
      return NextResponse.json(
        { error: "Tệp hình ảnh rỗng" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Hình ảnh không được vượt quá 8MB" },
        { status: 400 }
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });

    const extension = ALLOWED_TYPES.get(file.type)!;
    const filename = `${Date.now()}-${randomUUID()}${extension}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, bytes);

    return NextResponse.json(
      {
        success: true,
        name: filename,
        url: `/uploads/${filename}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Không thể upload hình ảnh" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as { name?: string };
    const name = body.name?.trim();

    if (!name || name.includes("/") || name.includes("\\") || name.includes("..")) {
      return NextResponse.json(
        { error: "Tên file không hợp lệ" },
        { status: 400 }
      );
    }

    const filePath = path.join(UPLOAD_DIR, name);
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Không thể xóa hình ảnh" },
      { status: 500 }
    );
  }
}
