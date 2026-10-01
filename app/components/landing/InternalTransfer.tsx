import {
  ArrowLeftRight,
  BarChart3,
  CircleDollarSign,
} from "lucide-react";

import type { SectionContent } from "@/lib/content";

const iconMap = {
  ArrowLeftRight,
  CircleDollarSign,
  BarChart3,
};

const fallbackIcons = [
  ArrowLeftRight,
  CircleDollarSign,
  BarChart3,
];

export default function InternalTransfer({
  section,
}: {
  section?: SectionContent;
}) {
  const items = section?.items ?? [];

  return (
    <section
      id="luan-chuyen"
      className="scroll-mt-24 bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16">
          <div className="order-1">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              {section?.name ||
                "Luân chuyển nội bộ"}
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {section?.title ||
                "Điều chuyển giữa các kho"}
            </h2>

            {section?.description && (
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {section.description}
              </p>
            )}
            {items.length > 0 && (
              <div className="mt-9 space-y-5">
                {items.map((item, index) => {
                  const Icon =
                    item.icon &&
                    item.icon in iconMap
                      ? iconMap[
                          item.icon as keyof typeof iconMap
                        ]
                      : fallbackIcons[
                          index %
                            fallbackIcons.length
                        ];

                  return (
                    <div
                      key={item.id}
                      className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.8}
                        />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="mt-1.5 text-sm leading-6 text-slate-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="order-2">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/50 sm:p-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {section?.image ? (
                  <img
                    src={section.image}
                    alt={
                      section.title ||
                      "Luân chuyển nội bộ"
                    }
                    className="block h-auto w-full object-contain"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center">
                    <ArrowLeftRight className="h-12 w-12 text-slate-200" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}