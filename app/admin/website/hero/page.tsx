import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const section = await prisma.siteSection.findUnique({ where: { key: "hero" } });
  if (section) redirect(`/admin/website/section/${section.id}`);
  redirect("/admin/website");
}
