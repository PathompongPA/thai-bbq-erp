"use server";

import { Action_State_interface } from "@/action";
import { prisma } from "@/lib/prisma";

export async function toggleActiveVariant(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  try {
    const variantId = Number(formData.get("variantId"));
    await prisma.$transaction(async (tx) => {
      const variant = await tx.item_Variant.findFirst({
        where: { id: variantId },
      });
      await tx.item_Variant.update({
        where: { id: variantId },
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

export async function getItemVariants(itemId: number) {
  return await prisma.item_Variant.findMany({
    where: { itemId },
    include: {
      variantAttribute: {
        include: {
          attribute: true,
        },
      },
    },
    orderBy: {
      price: "asc",
    },
  });
}
export async function createItemVariant(
  state: Action_State_interface,
  formdata: FormData,
): Promise<Action_State_interface> {
  // 1 create variant item
  // 2 create variant attribute

  try {
    const itemId = Number(formdata.get("itemId"));

    const price = Number(formdata.get("price"));
    const minimum_stock = Number(formdata.get("minimumStock"));

    await prisma.$transaction(async (tx) => {
      const attributes = Array.from(formdata.entries())
        .filter(([key]) => key.startsWith("attribute_"))
        .map(([key, value]) => ({
          attributeId: Number(key.replace("attribute_", "")),
          value: String(value),
        }));

      const skuSuffix = attributes
        .map(({ value }) => {
          return String(value.toUpperCase());
        })
        .join("-");

      const item = await tx.item.findUnique({ where: { id: itemId } });

      const Sku: string = String(`${item?.code}-${skuSuffix}`);

      const variant = await tx.item_Variant.create({
        data: {
          itemId: item?.id,
          price,
          minimum_stock,
          sku: String(Sku),
        },
      });

      const variantAttributes = Array.from(formdata.entries())
        .filter(([key]) => key.startsWith("attribute_"))
        .map(([key, value]) => ({
          attributeId: Number(key.replace("attribute_", "")),
          value: String(value),
          variantId: variant.id,
        }));
      // const sku = `${item?.code}-${String(variant.id).padStart(3, "0")}`;

      // await tx.item_Variant.update({ where: { id: item?.id }, data: { sku } });

      await tx.variantAttribute.createMany({
        data: variantAttributes,
      });
    });

    return { ...state };
  } catch (error) {
    console.log(error);

    return {
      ...state,
      success: false,
      error,
    };
  }
}

export async function updateItemVariant(
  state: Action_State_interface,
  formdata: FormData,
): Promise<Action_State_interface> {
  try {
    const variantId = Number(formdata.get("variantId"));
    const itemId = Number(formdata.get("itemId"));
    const price = Number(formdata.get("price"));
    const minimum_stock = Number(formdata.get("minimumStock"));

    if (!Number.isInteger(variantId) || variantId <= 0) {
      throw new Error("รหัส Variant ไม่ถูกต้อง");
    }

    if (!Number.isInteger(itemId) || itemId <= 0) {
      throw new Error("รหัสสินค้าไม่ถูกต้อง");
    }

    if (!Number.isFinite(price) || price < 0) {
      throw new Error("ราคาสินค้าไม่ถูกต้อง");
    }

    if (!Number.isFinite(minimum_stock) || minimum_stock < 0) {
      throw new Error("จำนวนสต็อกขั้นต่ำไม่ถูกต้อง");
    }

    const attributes = Array.from(formdata.entries())
      .filter(([key]) => key.startsWith("attribute_"))
      .map(([key, value]) => ({
        attributeId: Number(key.replace("attribute_", "")),
        value: String(value).trim(),
      }));

    if (
      attributes.some(
        ({ attributeId, value }) =>
          !Number.isInteger(attributeId) || attributeId <= 0 || !value,
      )
    ) {
      throw new Error("ข้อมูล Attribute ไม่ถูกต้อง");
    }

    if (
      new Set(attributes.map(({ attributeId }) => attributeId)).size !==
      attributes.length
    ) {
      throw new Error("ไม่สามารถส่ง Attribute ซ้ำกันได้");
    }

    await prisma.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: { id: itemId },
        select: { id: true, code: true },
      });

      if (!item) {
        throw new Error("ไม่พบสินค้า");
      }

      const skuSuffix = attributes
        .map(({ value }) => value.toUpperCase())
        .join("-");

      const sku = skuSuffix ? `${item.code}-${skuSuffix}` : item.code;

      // 1. Update Variant เดิม
      const variant = await tx.item_Variant.update({
        where: {
          id: variantId,
          itemId,
        },
        data: {
          price,
          minimum_stock,
          sku,
        },
      });

      // 2. ลบ Attribute เดิมทั้งหมดของ Variant นี้
      await tx.variantAttribute.deleteMany({
        where: {
          variantId: variant.id,
        },
      });

      // 3. บันทึก Attribute ชุดใหม่
      if (attributes.length > 0) {
        await tx.variantAttribute.createMany({
          data: attributes.map(({ attributeId, value }) => ({
            attributeId,
            value,
            variantId: variant.id,
          })),
        });
      }
    });

    return {
      ...state,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);

    return {
      ...state,
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการอัปเดต Variant",
    };
  }
}
