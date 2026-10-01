import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    return null;
  }

  const adminId = Number(session.value);

  if (!Number.isInteger(adminId) || adminId <= 0) {
    return null;
  }

  const admin = await prisma.adminUser.findUnique({
    where: {
      id: adminId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
    },
  });

  if (!admin || admin.status !== "active") {
    return null;
  }

  return admin;
}