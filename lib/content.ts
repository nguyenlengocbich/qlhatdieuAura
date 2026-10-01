import { prisma } from "@/lib/prisma";

export type Status = "published" | "draft";

export type HeroContent = {
  badge: string;
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
  status: Status;
  updatedAt: string;
};
export type CTASection = {
  title: string | null;
  description: string | null;
  badge: string | null;
  status: string;
  updatedAt: string;
}; 

export type SectionItem = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  image: string | null;
};

export type SectionContent = {
  key: string;
  name: string;
  description: string;
  status: Status;
  title: string;
  subtitle: string;
  body: string;
  image: string | null;
  items: SectionItem[];
  updatedAt: string;
};

export type SiteContent = {
  hero: HeroContent;
  cta: CTASection;
  sections: SectionContent[];
};

export async function getSiteContent(): Promise<SiteContent> {
  const sections = await prisma.siteSection.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  const items = await prisma.siteItem.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  const heroSection = sections.find(
    (section) => section.key === "hero"
  );

  const hero: HeroContent = {
    badge:
      heroSection?.subtitle ||
      "Phần mềm quản lý sản xuất & kinh doanh hạt điều",

    title:
      heroSection?.title ||
      "Quản lý toàn diện hoạt động hạt điều",

    description:
      heroSection?.description ||
      "Quản lý xuyên suốt từ mua nguyên liệu, nhập kho, sản xuất chế biến, quản lý thành phẩm đến bán hàng, công nợ và báo cáo hiệu quả kinh doanh.",

    primaryButton: "Khám phá tính năng",

    secondaryButton: "Xem quy trình",

    status:
      (heroSection?.status as Status) ||
      "published",

    updatedAt:
      heroSection?.updatedAt?.toISOString() ||
      new Date().toISOString(),
  };
  const ctaSection = sections.find(
  (section) => section.key === "cta"
);

const cta: CTASection = {
  badge:
    ctaSection?.subtitle ||
    "Giải pháp quản lý toàn diện",

  title:
    ctaSection?.title ||
    "Quản lý toàn bộ quy trình trên một nền tảng",

  description:
    ctaSection?.description ||
    "Từ mua nguyên liệu, sản xuất chế biến, quản lý kho đến bán hàng, công nợ và báo cáo — tất cả được kết nối trong một hệ thống quản lý tập trung.",

  status:
    ctaSection?.status || "published",

  updatedAt:
    ctaSection?.updatedAt?.toISOString() ||
    new Date().toISOString(),
};
  const resultSections: SectionContent[] =
    sections
      .filter((section) => section.key !== "hero")
      .map((section) => ({
        key: section.key,
        name: section.name,
        description: section.description || "",
        status:
          (section.status as Status) ||
          "published",
        title: section.title || "",
        subtitle: section.subtitle || "",
        body: section.content || "",
        image: section.image || null,
        items: items
          .filter(
            (item) => item.sectionKey === section.key
          )
          .map((item) => ({
            id: String(item.id),
            title: item.title,
            description: item.description || "",
            icon: item.icon || null,
            image: item.image || null,
          })),
        updatedAt:
          section.updatedAt.toISOString(),
      }));

  return {
    hero,cta,
    sections: resultSections,
  };
}

export async function getSection(
  key: string
): Promise<SectionContent | undefined> {
  const content = await getSiteContent();

  return content.sections.find(
    (section) => section.key === key
  );
}