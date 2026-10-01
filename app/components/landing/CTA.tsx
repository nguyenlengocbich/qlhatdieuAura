import { ArrowRight } from "lucide-react";

type CTASection = {
  title: string | null;
  description: string | null;
  badge: string | null;
  status: string;
  updatedAt: string;
}; 

export default function CTA({
  content,
}: {
  content: CTASection;
}) {
  return (
    <section id="lien-he" className="bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          {content.title && (
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              {content.title}
            </p>
          )}

          {content.title && (
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>
          )}

          {content.description && (
            <p className="mt-6 text-lg leading-8 text-slate-300">
              {content.description}
            </p>
          )}

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#gioi-thieu"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Khám phá hệ thống
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-900"
            >
              Liên hệ tư vấn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}