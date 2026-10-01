import {
  ShoppingCart,
  PackageCheck,
  Factory,
  Boxes,
  Truck,
  Wallet,
  BarChart3,
} from "lucide-react";

import type { SectionContent } from "@/lib/content";

const iconMap = {
  ShoppingCart,
  PackageCheck,
  Factory,
  Boxes,
  Truck,
  Wallet,
  BarChart3,
};

const fallbackIcons = [
  ShoppingCart,
  PackageCheck,
  Factory,
  Boxes,
  Truck,
  Wallet,
  BarChart3,
];

type ProcessSection = SectionContent | undefined;

export default function Process({
  section,
  items,
}: {
  section: ProcessSection;
  items: SectionContent["items"];
}) {
  return (
    <section
      id="quy-trinh"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Quy trình
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {section?.title ||
              "Từ nguyên liệu đến thành phẩm"}
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            {section?.description ||
              "Các nghiệp vụ được kết nối xuyên suốt trong hệ thống."}
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[7%] right-[7%] top-8 hidden h-px bg-slate-200 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-7">
            {items.map((step, index) => {
              const Icon =
                step.icon &&
                step.icon in iconMap
                  ? iconMap[
                      step.icon as keyof typeof iconMap
                    ]
                  : fallbackIcons[
                      index % fallbackIcons.length
                    ];

              return (
                <div
                  key={step.id}
                  className="relative text-center"
                >
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-sm">
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                    />

                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}