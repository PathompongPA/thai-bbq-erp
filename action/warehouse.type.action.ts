"use server";
import { action_init_state, Action_State_interface } from "@/action";
import { prisma } from "@/lib/prisma";

// export async function getWarehouseTypes(search?: string) {
//   const [items, total] = await prisma.$transaction([
//     prisma.warehouse_type.findMany({
//       where: {
//         OR: [{ name: { contains: search } }],
//       },
//     }),

//     prisma.warehouse_type.count(),
//   ]);
//   return [items, total];
// }

export async function getWarehouseTypes(search: string = "") {
  return await prisma.warehouse_type.findMany({
    where: {
      OR: [{ name: { contains: search } }],
    },
  });
}

export async function countWarehouseType() {
  return await prisma.warehouse_type.count();
}

export async function createWarehouseType(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  try {
    const name = formData.get("name") as string;

    if (!name)
      return {
        ...action_init_state,
        success: false,
        error: "กรุณากรอก 'ชื่อ'",
      };

    await prisma.$transaction(async (tx) => {
      await tx.warehouse_type.create({
        data: {
          name: name,
        },
      });
    });

    return { ...action_init_state };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ...action_init_state,
      success: false,
      error: error,
    };
  }
}

export async function deleteWarehouseType(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  try {
    const id = Number(formData.get("id"));
    if (!id)
      return {
        ...action_init_state,
        success: false,
        error: "ไม่พบ warehouse id.",
      };
    await prisma.warehouse_type.delete({
      where: {
        id,
      },
    });
    return { ...action_init_state };
  } catch (error) {
    return {
      ...action_init_state,
      error: error,
      success: false,
    };
  }
}
