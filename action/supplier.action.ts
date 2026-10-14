"use server";

import { Action_State_interface } from "@/action";
import { prisma } from "@/lib/prisma";

export async function getSuppliers() {
  return await prisma.supplier.findMany();
}
export async function getSupplier(id: number) {
  return await prisma.supplier.findUnique({
    where: { id },
  });
}

export async function createSupplier(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  try {
    const name = formData.get("name") as string;
    if (!name) return { ...state, success: false, error: `ไม่พบ 'ชื่อ' ` };

    await prisma.$transaction(async (tx) => {
      await tx.supplier.create({
        data: {
          name: name,
        },
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
