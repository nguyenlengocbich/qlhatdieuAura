import {
  BarChart3,
  Boxes,
  Factory,
  PackageCheck,
  PackageSearch,
  TrendingUp,
  Wallet,
  Truck,
  ArrowLeftRight,
} from "lucide-react";

import type {
  SectionContent,
  SectionItem,
} from "@/lib/content";

import type { LucideIcon } from "lucide-react";

type Props = {
  section?: SectionContent;
  items?: SectionItem[];
};

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Boxes,
  Factory,
  PackageCheck,
  PackageSearch,
  TrendingUp,
  Wallet,
  Truck,
  ArrowLeftRight,
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .trim();
}

function getIcon(
  iconName: string | null | undefined
): LucideIcon {
  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }

  return BarChart3;
}

function ImagePreview({
  src,
  alt,
  className = "",
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 ${className}`}
      >
        <div className="text-center">
          <BarChart3 className="mx-auto h-10 w-10 text-slate-200" />

          <p className="mt-3 text-xs font-medium text-slate-400">
            Chưa có hình ảnh
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="block h-full w-full object-contain"
      />
    </div>
  );
}
export default function Reports({
  section,
  items = [],
}: Props) {
  const warehouseReports = items.filter(
    (item) =>
      normalize(item.title).includes(
        "lãi / lỗ kho"
      )
  );
  const mainReports = items
    .filter(
      (item) =>
        !normalize(item.title).includes(
          "lãi / lỗ kho"
        )
    )
    .slice(0, 2);

  return (
    <section
      id="bao-cao"
      className="scroll-mt-24 bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700 sm:text-sm">
            <BarChart3 className="h-4 w-4" />

            {section?.name ||
              "Báo cáo & phân tích"}
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {section?.title ||
              "Theo dõi hiệu quả kinh doanh bằng dữ liệu"}
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {section?.description ||
              "Theo dõi doanh thu, chi phí, tồn kho và lãi/lỗ trên cùng một hệ thống quản lý tập trung."}
          </p>
        </div>
        {mainReports.length > 0 && (
          <div className="mt-14 space-y-7">
            {mainReports.map(
              (item, index) => (
                <MainReportCard
                  key={item.id}
                  item={item}
                  reverse={index % 2 === 1}
                />
              )
            )}
          </div>
        )}
        {warehouseReports.length > 0 && (
          <section className="mt-20 sm:mt-24 lg:mt-28">

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
                Lãi / lỗ theo từng kho
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Phân tích hiệu quả riêng cho từng kho
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Theo dõi doanh thu, giá vốn, chi phí và kết quả
                kinh doanh của từng kho trong hệ thống.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {warehouseReports.map(
                (item) => (
                  <WarehouseReportCard
                    key={item.id}
                    item={item}
                  />
                )
              )}
            </div>
          </section>
        )}
        {items.length === 0 && (
          <div className="mt-14 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-slate-300" />

            <p className="mt-4 text-sm font-semibold text-slate-500">
              Chưa có dữ liệu báo cáo
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Hãy thêm nội dung báo cáo trong Admin CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
function MainReportCard({
  item,
  reverse,
}: {
  item: SectionItem;
  reverse: boolean;
}) {
  const Icon = getIcon(item.icon);

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl">

      <div
        className={`grid lg:grid-cols-2 ${
          reverse
            ? "lg:[&>.report-image]:order-2"
            : ""
        }`}
      >
        <div className="report-image border-b border-slate-200 bg-slate-100 p-3 sm:p-4 lg:border-b-0 lg:p-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <ImagePreview
              src={item.image}
              alt={item.title}
              className="aspect-[16/10] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12 xl:p-14">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Icon
              className="h-7 w-7"
              strokeWidth={1.8}
            />
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Báo cáo
          </p>

          <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
            {item.title}
          </h3>

          {item.description && (
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
function WarehouseReportCard({
  item,
}: {
  item: SectionItem;
}) {
  const Icon = getIcon(item.icon);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className="bg-slate-100 p-3 sm:p-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <ImagePreview
            src={item.image}
            alt={item.title}
            className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-[1.015]"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Icon
              className="h-6 w-6"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
              Báo cáo lãi / lỗ
            </p>

            <h4 className="mt-1 text-lg font-bold leading-7 text-slate-900">
              {item.title}
            </h4>
          </div>
        </div>

        {item.description && (
          <p className="mt-5 flex-1 text-sm leading-7 text-slate-600">
            {item.description}
          </p>
        )}

        <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-slate-400">
            Phân tích hiệu quả kho
          </span>
        </div>
      </div>
    </article>
  );
}