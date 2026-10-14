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

export async function toggleActiveItem(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  try {
    const id = Number(formData.get("itemId"));
    await prisma.$transaction(async (tx) => {
      const variant = await tx.item.findFirst({
        where: { id: id },
      });
      await tx.item.update({
        where: { id: id },
        data: {
          isActive: !variant?.isActive,
        },
      });
    });
    return { ...state };
  } catch (error) {
    return { ...state, success: false, error: error };
  }
}
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
  const name_en = formData.get("name_en") as string;
  const code = formData.get("code") as string;
  const dayOfInventory = Number(formData.get("dayOfInventory"));

  const itemTypeId = Number(formData.get("itemTypeId"));
  const warehouseTypeId = Number(formData.get("warehouseTypeId"));
  const supplierId = Number(formData.get("supplierId"));
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
          name_en,
          code,
          day_of_inventory: dayOfInventory,

          item_typeId: itemTypeId,
          warehouse_typeId: warehouseTypeId,
          supplierId: supplierId,
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

export async function getProduct(productId: number) {
  return await prisma.$transaction(async (tx) => {
    const item_type_product = await tx.item_type.findFirst({
      where: {
        name: "product",
      },
    });
    return await prisma.item.findFirst({
      where: {
        id: productId,
        item_typeId: item_type_product?.id,
      },
      include: {
        itemType: true,
        warehouseType: true,
        supplier: true,
        item_attributes: true,
      },
    });
  });
}

export async function getProducts(search: string = "") {
  return await prisma.$transaction(async (tx) => {
    const item_type_product = await tx.item_type.findFirst({
      where: {
        name: "product",
      },
    });
    return await prisma.item.findMany({
      where: {
        item_typeId: item_type_product?.id,
        OR: [
          {
            name: {
              contains: search,
            },
          },
        ],
      },
      include: { variants: true, itemType: true },
    });
  });
}
