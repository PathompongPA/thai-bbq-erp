"use server";
import { prisma } from "@/lib/prisma";
import { Action_State_interface } from ".";

export async function countUnit() {
  return await prisma.unit.count();
}

export async function getUnits(search: string = "") {
  return await prisma.unit.findMany({
    where: {
      OR: [{ name: { contains: search } }],
    },
  });
}

export async function createUnit(
  state: Action_State_interface,
  formdata: FormData,
): Promise<Action_State_interface> {
  try {
    const name = formdata.get("name") as string;
    const name_en = formdata.get("name_en") as string;
    const symbol = formdata.get("symbol") as string;

    if (!name)
      return { ...state, success: false, error: "กรุณากรอก ชื่อ unit" };

    await prisma.unit.create({ data: { name, name_en, symbol } });

    return { ...state, success: true };
  } catch (error) {
    return {
      ...state,
      success: false,
      error,
    };
  }
}
