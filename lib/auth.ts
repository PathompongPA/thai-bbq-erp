import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return null;
  }
  const session = await prisma.session.findUnique({
    where: {
      id: token,
    },
    select: {
      id: true,
      expiresAt: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return session?.user;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
