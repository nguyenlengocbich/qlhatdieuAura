"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Save } from "lucide-react";
import type { HeroContent } from "@/lib/content";

export default function HeroEditor({ initial }: { initial: HeroContent }) {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof HeroContent, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero: form }),
      });

      if (!response.ok) {
        throw new Error("Không thể lưu nội dung.");
      }

      const data = await response.json();
      setForm(data.hero);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/website" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Quay lại Trang chủ
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Chỉnh sửa trang Giới thiệu</h1>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Đã lưu
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="space-y-6">
            <Field label="Nhãn nhỏ">
              <input value={form.badge} onChange={(e) => update("badge", e.target.value)} />
            </Field>

            <Field label="Tiêu đề">
              <textarea rows={3} value={form.title} onChange={(e) => update("title", e.target.value)} />
            </Field>

            <Field label="Mô tả">
              <textarea rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nút chính">
                <input value={form.primaryButton} onChange={(e) => update("primaryButton", e.target.value)} />
              </Field>
              <Field label="Nút phụ">
                <input value={form.secondaryButton} onChange={(e) => update("secondaryButton", e.target.value)} />
              </Field>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Trạng thái</p>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Đã xuất bản
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
            <Link href="/" target="_blank" className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900">
              Mở website →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      <div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-slate-200 [&_input]:bg-white [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:outline-none [&_input]:transition [&_input]:focus:border-blue-500 [&_input]:focus:ring-4 [&_input]:focus:ring-blue-100 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-slate-200 [&_textarea]:bg-white [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:transition [&_textarea]:focus:border-blue-500 [&_textarea]:focus:ring-4 [&_textarea]:focus:ring-blue-100">
        {children}
      </div>
    </label>
  );
}
