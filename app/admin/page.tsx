import type { ElementType } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Globe2,
  Pencil,
  Plus,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const sections = await prisma.siteSection.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const publishedCount = sections.filter(
    (section) => section.status === "published"
  ).length;

  const draftCount = sections.filter(
    (section) => section.status !== "published"
  ).length;

  return (
    <div className="space-y-7">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
              Quản trị website
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Tổng quan
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Quản lý nội dung và các section đang hiển thị trên landing page.
            </p>
          </div>

          <Link
            href="/admin/website"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Quản lý nội dung
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Tổng section"
          value={sections.length}
          hint="Section trên landing page"
          icon={FileText}
        />

        <StatCard
          label="Đang hiển thị"
          value={publishedCount}
          hint="Section đã xuất bản"
          icon={Globe2}
          positive
        />

        <StatCard
          label="Bản nháp"
          value={draftCount}
          hint="Section chưa xuất bản"
          icon={Pencil}
          warning
        />
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Nội dung website
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Các section được sắp xếp theo thứ tự hiển thị trên landing page.
            </p>
          </div>

          <Link
            href="/admin/website"
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-amber-600 transition hover:text-amber-700"
          >
            Quản lý tất cả
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {sections.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="group flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50 sm:gap-4 sm:px-6"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {section.name}
                    </p>

                    <StatusBadge
                      published={section.status === "published"}
                    />
                  </div>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {section.title || "Chưa có tiêu đề"}
                  </p>
                </div>

                {/* Edit */}
                <Link
                  href={`/admin/website/section/${section.id}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sửa</span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <FileText className="h-5 w-5 text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              Chưa có nội dung
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Hiện chưa có section nào trong website.
            </p>

            <Link
              href="/admin/website"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              Quản lý website
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900">
            Thao tác nhanh
          </h2>

          <Plus className="h-4 w-4 text-slate-300" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/admin/website"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-amber-200 hover:bg-amber-50/40"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Chỉnh sửa nội dung
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Quản lý các section của landing page
              </p>
            </div>

            <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-amber-600" />
          </Link>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-amber-200 hover:bg-amber-50/40"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Xem landing page
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Mở website ở một tab mới
              </p>
            </div>

            <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-amber-600" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  positive,
  warning,
}: {
  label: string;
  value: string | number;
  hint: string;
  icon: ElementType;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : warning
                ? "bg-amber-50 text-amber-600"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        {hint}
      </p>
    </div>
  );
}

function StatusBadge({
  published,
}: {
  published: boolean;
}) {
  if (published) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Đang hiển thị
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Bản nháp
    </span>
  );
}