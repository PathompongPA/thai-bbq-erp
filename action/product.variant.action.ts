"use server";

import { prisma } from "@/lib/prisma";
import { Action_State_interface } from ".";

export async function updateProduct(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  const id = Number(formData.get("itemId"));
  const name = String(formData.get("name") ?? "").trim();
  const name_en = String(formData.get("name_en") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  const dayOfInventory = Number(formData.get("dayOfInventory"));
  const itemTypeId = Number(formData.get("itemTypeId"));
  const warehouseTypeId = Number(formData.get("warehouseTypeId"));
  const supplierId = Number(formData.get("supplierId"));

  const attributeIds = formData.getAll("attributeIds").map(Number);

  try {
    // Validation
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid item ID.");
    }

    if (!name) {
      throw new Error("Missing name of product.");
    }

    if (!Number.isInteger(itemTypeId) || itemTypeId <= 0) {
      throw new Error("Invalid item type.");
    }

    if (!Number.isInteger(warehouseTypeId) || warehouseTypeId <= 0) {
      throw new Error("Invalid warehouse type.");
    }

    if (!Number.isInteger(supplierId) || supplierId <= 0) {
      throw new Error("Invalid supplier.");
    }

    if (!Number.isInteger(dayOfInventory) || dayOfInventory <= 0) {
      throw new Error("Invalid day of inventory.");
    }

    if (
      attributeIds.some(
        (attributeId) => !Number.isInteger(attributeId) || attributeId <= 0,
      )
    ) {
      throw new Error("Invalid attribute ID.");
    }

    // Remove duplicate IDs
    const uniqueAttributeIds = [...new Set(attributeIds)];

    await prisma.$transaction(async (tx) => {
      const item = await tx.item.update({
        where: { id },
        data: {
          name,
          name_en: name_en || null,
          code: code || null,
          day_of_inventory: dayOfInventory,
          item_typeId: itemTypeId,
          warehouse_typeId: warehouseTypeId,
          supplierId,
        },
      });

      // Delete all existing attributes
      await tx.item_attribute.deleteMany({
        where: { itemId: item.id },
      });

      // Insert only the new attribute set
      if (uniqueAttributeIds.length > 0) {
        await tx.item_attribute.createMany({
          data: uniqueAttributeIds.map((attributeId) => ({
            itemId: item.id,
            attributeId,
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
    console.error("Failed to update item:", error);

    return {
      ...state,
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}

export async function getVariant(variantId: number) {
  return await prisma.item_Variant.findFirst({
    where: { id: Number(variantId) },
  });
}
