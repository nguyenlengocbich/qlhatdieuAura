import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText, GripVertical, Pencil, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function WebsitePage() {
  const sections = await prisma.siteSection.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Link href="/admin" className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-slate-700"><ArrowLeft className="h-3.5 w-3.5" /> Dashboard</Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý website</h1>
          <p className="mt-1.5 text-sm text-slate-400">Chỉnh sửa nội dung từng khu vực trên landing page.</p>
        </div>
        <Link href="/" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"><ArrowUpRight className="h-4 w-4" /> Xem website</Link>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><FileText className="h-5 w-5" /></div>
          <div><p className="text-sm font-bold text-slate-800">Landing page</p><p className="text-xs text-slate-400">{sections.length} section · Database managed</p></div>
        </div>
        <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" /><input placeholder="Tìm section..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-amber-400 focus:bg-white" /></div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[44px_minmax(180px,1fr)_minmax(220px,1.4fr)_130px_90px] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:grid">
          <span>#</span><span>Section</span><span>Nội dung</span><span>Trạng thái</span><span></span>
        </div>
        <div className="divide-y divide-slate-100">
          {sections.map((section, index) => (
            <div key={section.id} className="group grid gap-3 px-5 py-5 transition hover:bg-slate-50/60 md:grid-cols-[44px_minmax(180px,1fr)_minmax(220px,1.4fr)_130px_90px] md:items-center md:gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><GripVertical className="hidden h-4 w-4 text-slate-200 md:block" />{String(index + 1).padStart(2, "0")}</div>
              <div className="min-w-0"><p className="text-sm font-bold text-slate-800">{section.name}</p><p className="mt-1 font-mono text-[10px] text-slate-400">{section.key}</p></div>
              <div className="min-w-0"><p className="truncate text-xs font-medium text-slate-600">{section.title || "Chưa có tiêu đề"}</p><p className="mt-1 truncate text-[11px] text-slate-400">{section.description || "Chưa có mô tả"}</p></div>
              <div><StatusBadge published={section.status === "published"} /></div>
              <Link href={`/admin/website/section/${section.id}`} className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"><Pencil className="h-3.5 w-3.5" /> Sửa</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ published }: { published: boolean }) {
  return published ? <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Đang hiển thị</span> : <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-slate-400" />Bản nháp</span>;
}
