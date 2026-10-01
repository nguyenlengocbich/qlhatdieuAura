"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navGroups = [
  {
    label: "Tổng quan",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Nội dung",
    items: [
      { href: "/admin/website", label: "Website", icon: FileText },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-slate-800 bg-slate-950 text-slate-300 lg:flex">
      <div className="flex h-[72px] items-center border-b border-white/10 px-5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-base font-black text-slate-950 shadow-lg shadow-amber-500/20">
            A
          </div>

          <div>
            <p className="text-[11px] text-slate-500">
              Website Management
            </p>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-6">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-7">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
              {group.label}
            </p>

            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                      active
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-[18px] w-[18px] ${
                        active
                          ? "text-slate-950"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    />

                    <span>{item.label}</span>

                    {active && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
      <div className="space-y-1 border-t border-white/10 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          Xem website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}