import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SectionEditor from "./SectionEditor";

export const dynamic = "force-dynamic";

export default async function SectionEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const section = await prisma.siteSection.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!section) {
    notFound();
  }

  const items = await prisma.siteItem.findMany({
    where: {
      sectionKey: section.key,
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return (
    <SectionEditor
      section={{
        id: section.id,
        key: section.key,
        name: section.name,
        title: section.title ?? "",
        subtitle: section.subtitle ?? "",
        description: section.description ?? "",
        content: section.content ?? "",
        image: section.image ?? "",
        status: section.status,
      }}
      items={items}
    />
  );
}