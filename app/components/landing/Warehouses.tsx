import {
  ArrowRight,
  Boxes,
  Factory,
  PackageCheck,
} from "lucide-react";
import type { SectionContent } from "@/lib/content";

const iconMap = {
  Boxes,
  Factory,
  PackageCheck,
};

export default function Warehouses({
  section,
  items,
}: {
  section?: SectionContent;
  items: SectionContent["items"];
}) {
  return (
    <section
      id="kho"
      className="scroll-mt-24 bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            {section?.name || "Hệ thống kho"}
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {section?.title ||
              "Quản lý xuyên suốt hệ thống kho"}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {section?.description}
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {items.map((item, index) => {
            const Icon =
              item.icon &&
              item.icon in iconMap
                ? iconMap[
                    item.icon as keyof typeof iconMap
                  ]
                : Boxes;

            return (
              <div key={item.id} className="contents">
                <article className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="text-4xl font-bold text-slate-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>

                {index < items.length - 1 && (
                  <div className="hidden items-center justify-center lg:flex">
                    <ArrowRight className="h-6 w-6 text-blue-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}