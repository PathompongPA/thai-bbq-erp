"use server";
import { Action_State_interface } from "@/action";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export async function countProduct() {
  return await prisma.item.count();
}

export type ITEM_VARIANTS = Prisma.ItemGetPayload<{
  include: {
    itemType: true;
    variants: true;
    _count: {
      select: {
        variants: true;
      };
    };
  };
}>;

export async function getItems(
  item_type?: number,
  search: string = "",
): Promise<ITEM_VARIANTS[]> {
  return await prisma.$transaction(async (tx) => {
    return await tx.item.findMany({
      where: {
        OR: [{ name: { contains: search } }],
        itemType: {
          id: item_type,
        },
      },
      include: {
        itemType: true,
        variants: true,
        _count: {
          select: {
            variants: true,
          },
        },
      },
    });
  });
}

export async function getItem(id: number) {
  return await prisma.item.findUnique({
    where: { id },
  });
}

export async function getItemTypes() {
  return await prisma.item_type.findMany();
}

export async function createProduct(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  const name = formData.get("name") as string;
  const dayOfInventory = Number(formData.get("dayOfInventory"));

  const itemTypeId = Number(formData.get("itemTypeId"));
  const warehouseTypeId = Number(formData.get("warehouseTypeId"));
  const supplierId = formData.get("supplierId") as string;
  const attributeIds = formData.getAll("attributeIds");

  try {
    if (!name) throw new Error("Missing name of product.");
    if (!itemTypeId) throw new Error("Missing itemType of product.");
    if (!warehouseTypeId) throw new Error("Missing itemType of product.");
    if (!supplierId) throw new Error("Missing itemType of product.");
    if (!dayOfInventory) throw new Error("Missing itemType of product.");
    if (!attributeIds) throw new Error("Missing itemType of product.");

    await prisma.$transaction(async (tx) => {
      const item = await tx.item.create({
        data: {
          name,
          day_of_inventory: dayOfInventory,

          item_typeId: itemTypeId,
          warehouse_typeId: warehouseTypeId,
        },
      });
      await tx.item_attribute.createMany({
        data: attributeIds.map((_attributeId) => ({
          itemId: item.id,
          attributeId: Number(_attributeId),
        })),
      });
    });

    return { ...state };
  } catch (error) {
    return {
      ...state,
      success: false,
      error: error,
    };
  }
}

export async function getProductAttribute(itemId: number) {
  const result = await prisma.item_attribute.findMany({
    where: {
      itemId: Number(itemId),
    },
    select: {
      attribute: true,
    },
  });
  return result.map((item) => item.attribute);
}

export async function getProduct(productId: number, search: string = "") {
  return await prisma.item.findFirst({
    where: {
      id: Number(productId),
    },
    include: {
      variants: {
        where: {
          OR: [
            {
              sku: { contains: search },
            },
          ],
        },
      },
      _count: {
        select: {
          variants: true,
        },
      },
    },
  });
}
