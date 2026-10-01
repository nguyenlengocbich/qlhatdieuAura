export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-bold text-white">
              Hạt Điều
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Giải pháp quản lý sản xuất và kinh doanh
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <a href="#gioi-thieu" className="transition hover:text-white">
              Giới thiệu
            </a>
            <a href="#tinh-nang" className="transition hover:text-white">
              Tính năng
            </a>
            <a href="#quy-trinh" className="transition hover:text-white">
              Quy trình
            </a>
            <a href="#bao-cao" className="transition hover:text-white">
              Báo cáo
            </a>
            <a href="#lien-he" className="transition hover:text-white">
              Liên hệ
            </a>
          </nav>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Hạt Điều Aurasoft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}