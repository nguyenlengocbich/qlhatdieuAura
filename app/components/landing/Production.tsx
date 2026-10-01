import {
  CircleDot,
  ClipboardList,
  Factory,
  PackageCheck,
} from "lucide-react";

import type { SectionContent } from "@/lib/content";

const iconMap = {
  CircleDot,
  ClipboardList,
  Factory,
  PackageCheck,
};

const fallbackIcons = [
  CircleDot,
  ClipboardList,
  Factory,
  PackageCheck,
];

export default function Production({
  section,
}: {
  section?: SectionContent;
}) {
  const items = section?.items ?? [];

  return (
    <section
      id="san-xuat"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-3 shadow-xl shadow-slate-200/50 sm:p-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {section?.image ? (
                  <img
                    src={section.image}
                    alt={section.title || "Quản lý sản xuất"}
                    className="block h-auto w-full object-contain"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-slate-50">
                    <Factory className="h-12 w-12 text-slate-200" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              {section?.name || "Sản xuất"}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {section?.title ||
                "Quản lý sản xuất"}
            </h2>
            {section?.description && (
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {section.description}
              </p>
            )}
            {items.length > 0 && (
              <div className="mt-9 space-y-6">
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
                      className="group flex gap-4"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon
                          className="h-6 w-6"
                          strokeWidth={1.8}
                        />
                      </div>

                      <div className="pt-1">
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
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
        </div>
      </div>
    </section>
  );
}