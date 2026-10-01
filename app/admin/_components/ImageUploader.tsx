"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";

type Props = {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
  compact?: boolean;
};

export default function ImageUploader({
  value,
  onChange,
  label = "Hình ảnh",
  hint = "JPG, PNG, WEBP hoặc GIF • tối đa 8MB",
  compact = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload thất bại");
      }

      onChange(data.url);
      setMessage("Upload thành công");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Không thể upload hình ảnh"
      );
    } finally {
      setUploading(false);
    }
  }

  function selectFile(file?: File) {
    if (!file) return;
    void upload(file);
  }

  function clearImage() {
    onChange("");
    setMessage("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-slate-700">
            {label}
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            {hint}
          </div>
        </div>

        {message && (
          <div
            className={`flex items-center gap-1 text-[10px] font-semibold ${
              message.includes("thành công")
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {message.includes("thành công") && (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            {message}
          </div>
        )}
      </div>

      {value ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className={compact ? "aspect-[16/9]" : "aspect-[16/8]"}>
            <img
              src={value}
              alt="Ảnh đã chọn"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white p-3">
            <div className="flex min-w-0 items-center gap-2">
              <ImageIcon className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="truncate text-[11px] font-medium text-slate-500">
                {value}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Đổi ảnh
              </button>

              <button
                type="button"
                onClick={clearImage}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-[11px] font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            selectFile(event.dataTransfer.files?.[0]);
          }}
          disabled={uploading}
          className={`flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
            dragging
              ? "border-amber-400 bg-amber-50"
              : "border-slate-200 bg-slate-50 hover:border-amber-300 hover:bg-amber-50/40"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Upload className="h-6 w-6" />
            )}
          </div>

          <div className="mt-4 text-sm font-semibold text-slate-700">
            {uploading
              ? "Đang upload..."
              : "Chọn hình ảnh hoặc kéo thả vào đây"}
          </div>

          <div className="mt-1 text-xs text-slate-400">
            File sẽ được lưu vào thư viện ảnh của website
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          selectFile(event.target.files?.[0]);
        }}
      />
    </div>
  );
}
