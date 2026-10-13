"use server";
import { Action_State_interface } from "@/action";
import { prisma } from "@/lib/prisma";

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
      const item = await tx.item.findUnique({ where: { id: itemId } });

      const variant = await tx.item_Variant.create({
        data: {
          price,
          minimum_stock,
        },
      });

      const sku = `${item?.name?.slice(0, 3)}-${variant.id}`;

      const variantAttributes = Array.from(formdata.entries())
        .filter(([key]) => key.startsWith("attribute_"))
        .map(([key, value]) => ({
          attributeId: Number(key.replace("attribute_", "")),
          value: String(value),
          variantId: variant.id,
        }));

      await tx.item_Variant.update({ where: { id: item?.id }, data: { sku } });

      await tx.variantAttribute.createMany({
        data: variantAttributes,
      });
    });

    return { ...state };
  } catch (error) {
    return {
      ...state,
      success: false,
      error,
    };
  }
}
