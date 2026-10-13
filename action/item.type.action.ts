import { prisma } from "@/lib/prisma";

export async function getItemTypes() {
  const data = await prisma.item_type.findMany();
  return data;
}

export async function getItemType(search: string) {
  return await prisma.item_type.findFirst({
    where: {
      OR: [{ name: { contains: search } }],
    },
  });
}
