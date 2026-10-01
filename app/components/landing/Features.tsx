import {
  ShoppingCart,
  Factory,
  Boxes,
  ReceiptText,
  ArrowLeftRight,
  BarChart3,
} from "lucide-react";

import type { SectionContent } from "@/lib/content";

const iconMap = {
  ShoppingCart,
  Factory,
  Boxes,
  ReceiptText,
  ArrowLeftRight,
  BarChart3,
};

const fallbackIcons = [
  ShoppingCart,
  Factory,
  Boxes,
  ReceiptText,
  ArrowLeftRight,
  BarChart3,
];

type FeatureSection = SectionContent | undefined;

export default function Features({
  section,
  items,
}: {
  section: FeatureSection;
  items: SectionContent["items"];
}) {
  return (
    <section
      id="tinh-nang"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Tính năng
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {section?.title ||
              "Quản lý toàn diện cho từng hoạt động"}
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            {section?.description ||
              "Các nghiệp vụ được kết nối trên cùng một hệ thống."}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((feature, index) => {
            const Icon =
              feature.icon &&
              feature.icon in iconMap
                ? iconMap[
                    feature.icon as keyof typeof iconMap
                  ]
                : fallbackIcons[index % fallbackIcons.length];

            return (
              <div
                key={feature.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="absolute right-6 top-6 text-sm font-semibold text-slate-200">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>

                <div className="mt-6 h-px w-8 bg-blue-600 transition-all duration-300 group-hover:w-14" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}