import { prisma } from "@/lib/prisma";

export async function countMaterial() {
  return prisma.$transaction(async (tx) => {
    const item_type_product = await tx.item_type.findFirst({
      where: {
        name: "material",
      },
    });
    return await tx.item.count({
      where: { item_typeId: item_type_product?.id },
    });
  });
}

export async function getMaterials(search: string = "") {
  return prisma.$transaction(async (tx) => {
    const item_type_product = await tx.item_type.findFirst({
      where: {
        name: "material",
      },
    });
    return await tx.item.findMany({
      where: {
        item_typeId: item_type_product?.id,
        OR: [{ name: { contains: search } }],
      },
    });
  });
}
