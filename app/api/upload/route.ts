import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// =========================
// Cloudinary configuration
// =========================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =========================
// Upload configuration
// =========================
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

// =========================
// Helper: upload Buffer
// =========================
function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    public_id?: string;
  } = {}
): Promise<{
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  bytes: number;
}> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "hat-dieu-aura",
        public_id: options.public_id,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary không trả về kết quả upload"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          format: result.format,
          bytes: result.bytes,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

// =========================
// GET
// =========================
export async function GET() {
  return NextResponse.json([]);
}

// =========================
// POST - Upload image
// =========================
export async function POST(request: Request) {
  try {
    // -------------------------
    // Kiểm tra Cloudinary config
    // -------------------------
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary environment variables");

      return NextResponse.json(
        {
          error:
            "Cloudinary chưa được cấu hình. Vui lòng kiểm tra Environment Variables.",
        },
        { status: 500 }
      );
    }

    // -------------------------
    // Lấy file
    // -------------------------
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Vui lòng chọn một hình ảnh",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // Kiểm tra loại file
    // -------------------------
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          error:
            "Định dạng không hợp lệ. Chỉ hỗ trợ JPG, PNG, WEBP và GIF.",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // Kiểm tra file rỗng
    // -------------------------
    if (file.size <= 0) {
      return NextResponse.json(
        {
          error: "Tệp hình ảnh rỗng",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // Kiểm tra dung lượng
    // -------------------------
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "Hình ảnh không được vượt quá 8MB",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // Convert File -> Buffer
    // -------------------------
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // -------------------------
    // Upload Cloudinary
    // -------------------------
    const result = await uploadToCloudinary(buffer, {
      folder: "hat-dieu-aura",
    });

    console.log("Cloudinary upload success:", {
      public_id: result.public_id,
      secure_url: result.secure_url,
      bytes: result.bytes,
    });

    // -------------------------
    // Trả URL cho ImageUploader
    // -------------------------
    return NextResponse.json(
      {
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        size: result.bytes,
      },
      { status: 201 }
    );
  }catch (error) {
    console.error("========== CLOUDINARY UPLOAD ERROR ==========");
    console.error(error);
    console.error("============================================");

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Không thể upload hình ảnh lên Cloudinary",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE - Delete image
// =========================
export async function DELETE(request: Request) {
  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        {
          error: "Cloudinary chưa được cấu hình",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as {
      public_id?: string;
    };

    const publicId = body.public_id?.trim();

    if (!publicId) {
      return NextResponse.json(
        {
          error: "Thiếu public_id của hình ảnh",
        },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      console.error("Cloudinary delete result:", result);

      return NextResponse.json(
        {
          error: "Không thể xóa hình ảnh khỏi Cloudinary",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result: result.result,
    });
  } catch (error) {
    console.error("Cloudinary delete error:", error);

    return NextResponse.json(
      {
        error: "Không thể xóa hình ảnh",
      },
      { status: 500 }
    );
  }
}