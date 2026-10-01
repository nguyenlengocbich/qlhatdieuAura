import type { ElementType } from "react";
import Link from "next/link";
import { ArrowLeft, Database, Globe2, Settings2 } from "lucide-react";

export default function SettingsPage() {
  return <div className="space-y-7"><div><Link href="/admin" className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-700"><ArrowLeft className="h-3.5 w-3.5" /> Dashboard</Link><h1 className="text-2xl font-bold tracking-tight">Cài đặt website</h1><p className="mt-1.5 text-sm text-slate-400">Cấu hình chung cho website và hệ thống CMS.</p></div><div className="grid gap-5 md:grid-cols-2"><SettingCard icon={Globe2} title="Thông tin website" desc="Tên website, mô tả, email liên hệ và SEO." /><SettingCard icon={Database} title="Cơ sở dữ liệu" desc="SQLite + Prisma đang được sử dụng để lưu nội dung CMS." /><SettingCard icon={Settings2} title="Cấu hình hệ thống" desc="Các tùy chọn hệ thống sẽ được triển khai ở bước tiếp theo." /></div></div>;
}
function SettingCard({ icon: Icon, title, desc }: { icon: ElementType; title: string; desc: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Icon className="h-5 w-5" /></div><h2 className="mt-4 text-sm font-bold text-slate-900">{title}</h2><p className="mt-2 text-xs leading-5 text-slate-400">{desc}</p></div>; }
