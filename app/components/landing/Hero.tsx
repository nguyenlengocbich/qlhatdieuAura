type HeroContent = {
  badge: string;
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
};

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="gioi-thieu" className="relative scroll-mt-24 overflow-hidden bg-slate-50 pt-32">
      <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-medium text-amber-700 shadow-sm">
            {content.badge}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {content.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#tinh-nang" className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800">
              {content.primaryButton}
            </a>
            <a href="#quy-trinh" className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
              {content.secondaryButton}
            </a>
          </div>
        </div>
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
            <img src="/images/dashboard.png" alt="Dashboard phần mềm quản lý hạt điều" className="w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
