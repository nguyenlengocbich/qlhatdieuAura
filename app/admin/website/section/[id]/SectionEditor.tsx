"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import ImageUploader from "@/app/admin/_components/ImageUploader";
import {
  ArrowLeft,
  BarChart3,
  Boxes,
  Check,
  ChevronDown,
  ExternalLink,
  Factory,
  GripVertical,
  Image as ImageIcon,
  PackageCheck,
  Plus,
  ReceiptText,
  Save,
  ShoppingCart,
  Trash2,
  Truck,
  Wallet,
  ArrowLeftRight,
} from "lucide-react";

type Section = {
  id: number;
  key: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  image: string;
  status: string;
};

type SiteItem = {
  id: number;
  sectionKey: string;
  title: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  sortOrder: number;
  status: string;
};

const iconMap = {
  ShoppingCart,
  Factory,
  Boxes,
  ReceiptText,
  ArrowLeftRight,
  BarChart3,
  PackageCheck,
  Truck,
  Wallet,
};

const iconOptions = Object.keys(iconMap);

export default function SectionEditor({
  section,
  items: initialItems,
}: {
  section: Section;
  items: SiteItem[];
}) {
  const [form, setForm] = useState<Section>(section);
  const [items, setItems] = useState<SiteItem[]>(initialItems);

  const [saving, setSaving] = useState(false);
  const [savingItem, setSavingItem] = useState<number | null>(null);
  const [addingItem, setAddingItem] = useState(false);

  const [message, setMessage] = useState("");
  const [itemMessage, setItemMessage] = useState("");

  const itemSections = [
    "features",
    "process",
    "warehouses",
    "production",
    "internal-transfer",
    "reports",
    "screenshots",
  ];
  const isItemsSection = itemSections.includes(form.key);
  const imageEnabledSections = [
  "production",
  "internal-transfer",
];
const showImageUploader = imageEnabledSections.includes(section.key);
  function updateField(field: keyof Section, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage("");
  }

  function updateItem(
    id: number,
    field: keyof SiteItem,
    value: string | number | null
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );

    setItemMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/sections/${section.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Không thể lưu dữ liệu"
        );
      }

      setForm(data);
      setMessage("Đã lưu thay đổi");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra"
      );
    } finally {
      setSaving(false);
    }
  }

  async function saveItem(item: SiteItem) {
    setSavingItem(item.id);
    setItemMessage("");

    try {
      const response = await fetch(
        `/api/items/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Không thể lưu nội dung"
        );
      }

      setItems((current) =>
        current.map((currentItem) =>
          currentItem.id === item.id
            ? data
            : currentItem
        )
      );

      setItemMessage("Đã lưu nội dung");
    } catch (error) {
      setItemMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra"
      );
    } finally {
      setSavingItem(null);
    }
  }

  async function addItem() {
    setAddingItem(true);
    setItemMessage("");

    try {
      const defaultTitle =
        form.key === "features"
          ? "Tính năng mới"
          : "Bước quy trình mới";

      const response = await fetch(
        `/api/sections/${section.id}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: defaultTitle,
            description: "Nhập mô tả...",
            icon:
              form.key === "features"
                ? "Boxes"
                : "Factory",
            status: "published",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Không thể thêm nội dung"
        );
      }

      setItems((current) => [...current, data]);
      setItemMessage("Đã thêm nội dung");
    } catch (error) {
      setItemMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra"
      );
    } finally {
      setAddingItem(false);
    }
  }

  async function deleteItem(id: number) {
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa nội dung này?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/items/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Không thể xóa nội dung"
        );
      }

      setItems((current) =>
        current.filter((item) => item.id !== id)
      );

      setItemMessage("Đã xóa nội dung");
    } catch (error) {
      setItemMessage(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra"
      );
    }
  }

  function getIcon(iconName: string | null, index: number) {
    if (
      iconName &&
      iconName in iconMap
    ) {
      return iconMap[
        iconName as keyof typeof iconMap
      ];
    }

    const fallback = [
      ShoppingCart,
      Factory,
      Boxes,
      ReceiptText,
      ArrowLeftRight,
      BarChart3,
    ];

    return fallback[index % fallback.length];
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 pb-24"
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Link
            href="/admin/website"
            className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-slate-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Quản lý website
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Chỉnh sửa section
            </h1>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-500">
              {form.key}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                form.status === "published"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {form.status === "published"
                ? "Đang hiển thị"
                : "Bản nháp"}
            </span>
          </div>

          <p className="mt-1.5 text-sm text-slate-400">
            Cập nhật nội dung và trạng thái hiển thị.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {message && (
            <span
              className={`mr-1 flex items-center gap-1.5 text-xs font-semibold ${
                message.includes("Đã")
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              {message}
            </span>
          )}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Xem website
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />

            {saving
              ? "Đang lưu..."
              : "Lưu thay đổi"}
          </button>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <SparklesIcon />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Thông tin nội dung
                </h2>

                <p className="text-[11px] text-slate-400">
                  Nội dung chính của section
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Field
                label="Tên section"
                hint="Tên hiển thị trong CMS"
              >
                <input
                  value={form.name}
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Tiêu đề">
                <input
                  value={form.title}
                  onChange={(e) =>
                    updateField(
                      "title",
                      e.target.value
                    )
                  }
                  className={inputClass}
                  placeholder="Nhập tiêu đề..."
                />
              </Field>
              <Field label="Mô tả">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                  rows={5}
                  className={textareaClass}
                  placeholder="Nhập mô tả..."
                />
              </Field>
            </div>
          </div>
          {showImageUploader && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <ImageIcon className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Hình ảnh
                </h2>
                <p className="text-[11px] text-slate-400">
                  Đường dẫn hình ảnh của section
                </p>
              </div>
            </div>

            <Field label="Image URL">
              <ImageUploader value={form.image} onChange={(url) =>  updateField("image", url)}label="Hình ảnh"/>
            </Field>
          </div>
          )}
          {isItemsSection && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Nội dung bên trong
                  </h2>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Quản lý từng{" "}
                    {form.key === "features"
                      ? "tính năng"
                      : "bước trong quy trình"}
                    .
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  disabled={addingItem}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />

                  {addingItem
                    ? "Đang thêm..."
                    : "Thêm nội dung"}
                </button>
              </div>

              {itemMessage && (
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold text-emerald-600 sm:px-6">
                  {itemMessage}
                </div>
              )}

              <div className="divide-y divide-slate-100">
                {items.length === 0 ? (
                  <div className="px-6 py-12 text-center text-sm text-slate-400">
                    Chưa có nội dung.
                  </div>
                ) : (
                  items.map((item, index) => {
                    const Icon = getIcon(
                      item.icon,
                      index
                    );

                    return (
                      <div
                        key={item.id}
                        className="p-5 sm:p-6"
                      >
                        <div className="flex gap-4">
                          <div className="hidden pt-3 text-slate-300 sm:block">
                            <GripVertical className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                  <Icon className="h-5 w-5" />
                                </div>

                                <div>
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Nội dung #{index + 1}
                                  </div>

                                  <div className="text-xs font-medium text-slate-500">
                                    ID: {item.id}
                                  </div>
                                </div>
                              </div>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                  item.status === "published"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {item.status ===
                                "published"
                                  ? "Đang hiển thị"
                                  : "Bản nháp"}
                              </span>
                            </div>
                            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
                              <Field label="Tiêu đề">
                                <input
                                  value={item.title}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id,
                                      "title",
                                      e.target.value
                                    )
                                  }
                                  className={inputClass}
                                  placeholder="Nhập tiêu đề..."
                                />
                              </Field>

                              <Field label="Icon">
                                <div className="relative">
                                  <select
                                    value={
                                      item.icon ?? ""
                                    }
                                    onChange={(e) =>
                                      updateItem(
                                        item.id,
                                        "icon",
                                        e.target.value
                                      )
                                    }
                                    className={`${inputClass} appearance-none pr-10`}
                                  >
                                    <option value="">
                                      Tự động
                                    </option>

                                    {iconOptions.map(
                                      (icon) => (
                                        <option
                                          key={icon}
                                          value={icon}
                                        >
                                          {icon}
                                        </option>
                                      )
                                    )}
                                  </select>

                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                </div>
                              </Field>
                            </div>

                            <Field label="Mô tả">
                              <textarea
                                value={
                                  item.description ?? ""
                                }
                                onChange={(e) =>
                                  updateItem(
                                    item.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                rows={3}
                                className={textareaClass}
                                placeholder="Nhập mô tả..."
                              />
                            </Field>

                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field label="Thứ tự">
                                <input
                                  type="number"
                                  value={
                                    item.sortOrder
                                  }
                                  onChange={(e) =>
                                    updateItem(
                                      item.id,
                                      "sortOrder",
                                      Number(
                                        e.target.value
                                      )
                                    )
                                  }
                                  className={inputClass}
                                />
                              </Field>

                              <Field label="Trạng thái">
                                <select
                                  value={item.status}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id,
                                      "status",
                                      e.target.value
                                    )
                                  }
                                  className={inputClass}
                                >
                                  <option value="published">
                                    Đang hiển thị
                                  </option>

                                  <option value="draft">
                                    Bản nháp
                                  </option>
                                </select>
                              </Field>
                              {(form.key === "reports" || form.key === "screenshots") && (
                                <div className="space-y-4">
                                  <Field
                                    label="Hình ảnh"
                                    hint="Tải ảnh trực tiếp lên hệ thống"
                                  >
                                    <ImageUploader
                                      value={item.image ?? ""}
                                      onChange={(url) =>
                                        updateItem(
                                          item.id,
                                          "image",
                                          url
                                        )
                                      }
                                    />
                                  </Field>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
                              <button
                                type="button"
                                onClick={() =>
                                  deleteItem(
                                    item.id
                                  )
                                }
                                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                Xóa
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  saveItem(item)
                                }
                                disabled={
                                  savingItem ===
                                  item.id
                                }
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                              >
                                <Save className="h-4 w-4" />

                                {savingItem ===
                                item.id
                                  ? "Đang lưu..."
                                  : "Lưu nội dung"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Trạng thái
                </h2>
                <p className="mt-1 text-[11px] text-slate-400">
                  Kiểm soát việc xuất bản
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  form.status === "published"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {form.status === "published"
                  ? "Đang hiển thị"
                  : "Bản nháp"}
              </span>
            </div>

            <div className="relative">
              <select
                value={form.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value
                  )
                }
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="published">
                  Đang hiển thị
                </option>

                <option value="draft">
                  Bản nháp
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <div className="text-xs font-bold text-blue-900">
              Lưu ý
            </div>

            <p className="mt-2 text-xs leading-5 text-blue-700">
              Nội dung được lưu trực tiếp vào
              database. Section ở trạng thái
              &quot;Bản nháp&quot; sẽ không được
              hiển thị trên website.
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE SAVE BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-900">
              {form.name}
            </p>

            <p className="text-[10px] text-slate-400">
              Thay đổi chưa lưu
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const formElement =
                document.querySelector(
                  "form"
                ) as HTMLFormElement | null;

              formElement?.requestSubmit();
            }}
            disabled={saving}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60"
          >
            <Save className="h-4 w-4" />

            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </form>
  );
}

function SparklesIcon() {
  return (
    <span className="text-sm font-bold">✦</span>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-xs font-bold text-slate-700">
          {label}
        </label>

        {hint && (
          <span className="text-[10px] text-slate-400">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-50";

const textareaClass =
  inputClass +
  " resize-y leading-6";