"use client";

import Image from "next/image";
import { MonitorPlay } from "lucide-react";
import type {
  SectionContent,
  SectionItem,
} from "@/lib/content";
type Props = {
  section?: SectionContent;
  items?: SectionItem[];
};

export default function Screenshots({
  section,
  items = [],
}: Props) {
  return (
    <section
      id="giao-dien"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {section?.subtitle && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <MonitorPlay className="h-4 w-4" />
              {section.subtitle}
            </div>
          )}

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {section?.title}
          </h2>

          {section?.description && (
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {section.description}
            </p>
          )}
        </div>
        {items.length > 0 && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain object-top transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      Chưa có hình ảnh
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {items.length === 0 && (
          <div className="mt-16 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
            <MonitorPlay className="mx-auto h-8 w-8 text-slate-300" />

            <p className="mt-3 text-sm text-slate-400">
              Chưa có hình ảnh giao diện.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}