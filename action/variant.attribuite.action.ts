"use server";
import { prisma } from "@/lib/prisma";

export async function getVariantAttribute(variantId: number) {
  return await prisma.variantAttribute.findMany({
    where: {
      variant: {
        id: variantId,
      },
    },
    include: {
      attribute: true,
    },
  });
}
