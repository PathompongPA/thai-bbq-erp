"use server";
import { prisma } from "@/lib/prisma";

export async function getItemAttributes(itemId: number) {
  return await prisma.item_attribute.findMany({
    where: {
      itemId,
    },
    include: {
      attribute: true,
    },
    orderBy: {
      attributeId: "asc",
    },
  });
}
