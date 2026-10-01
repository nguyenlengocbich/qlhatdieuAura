"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Giới thiệu", href: "#gioi-thieu" },
  { label: "Tính năng", href: "#tinh-nang" },
  { label: "Quy trình", href: "#quy-trinh" },
  { label: "Báo cáo", href: "#bao-cao" },
  { label: "Liên hệ", href: "#lien-he" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">    
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            A
          </div>
          <span className="text-lg font-bold text-slate-900">
            Hạt Điều Aurasoft
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
              {link.label}
            </a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-medium">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}