"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  FileText,
  LayoutDashboard,
  Menu,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";

const groups = [
  {
    label: "Tổng quan",
    items: [["/admin", "Dashboard", LayoutDashboard]] as const,
  },
  {
    label: "Nội dung",
    items: [
      ["/admin/website", "Website", FileText],
    ] as const,
  },
];

export default function AdminMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setOpen(false);
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-sm font-black text-slate-950 shadow-sm">
              A
            </span>

            <span>
              <span className="mt-1 block text-[10px] leading-none text-slate-400">
                Website Management
              </span>
            </span>
          </Link>
        </div>

        <Link
          href="/"
          target="_blank"
          aria-label="Xem website"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
          />

          <aside className="relative flex h-full w-[min(86vw,320px)] flex-col bg-slate-950 text-slate-300 shadow-2xl">
            {/* Header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
              <Link
                href="/admin"
                className="flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-base font-black text-slate-950">
                  A
                </span>

                <span>
                  <span className="block text-[10px] text-slate-500">
                    Website Management
                  </span>
                </span>
              </Link>

              <button
                type="button"
                aria-label="Đóng menu"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-6">
              {groups.map((group) => (
                <div key={group.label} className="mb-7">
                  <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
                    {group.label}
                  </p>

                  <nav className="space-y-1">
                    {group.items.map(([href, label, Icon]) => {
                      const active =
                        href === "/admin"
                          ? pathname === href
                          : pathname.startsWith(href);

                      return (
                        <Link
                          key={href}
                          href={href}
                          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                            active
                              ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10"
                              : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon
                            className={`h-[18px] w-[18px] ${
                              active
                                ? "text-slate-950"
                                : "text-slate-500"
                            }`}
                          />

                          <span>{label}</span>

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

            {/* Bottom actions */}
            <div className="border-t border-white/10 p-4">
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
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}