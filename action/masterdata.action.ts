import { prisma } from "@/lib/prisma";

export type master_data_category = "product" | "material";
export type master_data_count = {
  amount_product: number;
  amount_material: number;
  amount_unit: number;
  amount_attribute: number;
  amount_warehouse_type: number;
  amount_supplier: number;
};

export async function countMasterdata(): Promise<master_data_count> {
  return await prisma.$transaction(async (tx) => {
    const item_type_product = await tx.item_type.findFirst({
      where: {
        name: "product",
      },
    });
    const item_type_material = await tx.item_type.findFirst({
      where: {
        name: "material",
      },
    });
    const amount_material = await tx.item.count({
      where: {
        item_typeId: item_type_material?.id,
      },
    });

    const amount_product = await tx.item.count({
      where: {
        item_typeId: item_type_product?.id,
      },
    });
    const amount_unit = await tx.unit.count();
    const amount_attribute = await tx.attribute.count();
    const amount_warehouse_type = await tx.warehouse_type.count();
    const amount_supplier = await tx.supplier.count();

    return {
      amount_material,
      amount_product,
      amount_unit,
      amount_attribute,
      amount_warehouse_type,
      amount_supplier,
    };
  });
}
