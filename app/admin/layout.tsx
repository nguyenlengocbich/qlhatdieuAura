import type { ReactNode } from "react";
import Link from "next/link";
import { Bell, ChevronRight, ExternalLink } from "lucide-react";
import AdminSidebar from "./_components/AdminSidebar";
import AdminMobileNav from "./_components/AdminMobileNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-[264px]">
        <AdminMobileNav />
        <header className="sticky top-0 z-30 hidden h-[72px] border-b border-slate-200/80 bg-white/90 backdrop-blur-xl lg:block">
          <div className="flex h-full items-center justify-between px-5 sm:px-7">
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className="hidden text-slate-400 sm:inline">Admin</span>
              <ChevronRight className="hidden h-4 w-4 text-slate-300 sm:inline" />
              <span className="truncate font-semibold text-slate-800">Quản trị website</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/"
                target="_blank"
                className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:flex"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Xem website
              </Link>
              <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">AD</div>
                <div className="hidden leading-tight sm:block">
                  <p className="text-xs font-semibold text-slate-800">Administrator</p>
                  <p className="text-[10px] text-slate-400">Quản trị viên</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 xl:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
