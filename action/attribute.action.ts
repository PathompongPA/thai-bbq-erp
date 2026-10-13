"use server";

import { Attribute } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { Action_State_interface } from ".";
import { revalidatePath } from "next/cache";

export type Attributes_type = Attribute;

export interface Action_interface {
  state: Action_State_interface;
  formData: FormData;
}

export async function countAttribute() {
  return await prisma.attribute.count();
}

export async function getAttributes(
  search: string = "",
): Promise<Attributes_type[]> {
  return await prisma.attribute.findMany({
    where: {
      OR: [{ name: { contains: search } }],
    },
  });
}

export async function createAttribute(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  const name = formData.get("AttributeName") as string;
  try {
    if (!name) throw new Error("กรุณากรอกชื่อคุณสมบัติ");
    await prisma.attribute.create({
      data: {
        name,
      },
    });
    return { ...state };
  } catch (error: unknown) {
    return {
      ...state,
      success: false,
      error: error,
    };
  }
}

export async function editAttribute(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  try {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;

    if (!name) throw new Error("ไม่อนุญาติชื่อคุณสมบัติเป็นค่าว่าง");
    if (!id) throw new Error("ไม่พบ attribute id");

    await prisma.$transaction(async (tx) => {
      await tx.attribute.update({
        where: { id },
        data: { name },
      });
    });

    revalidatePath("/attribute");

    return state;
  } catch (error) {
    return {
      ...state,
      success: false,
      error: error,
    };
  }
}

export async function deleteAttribute(
  state: Action_State_interface,
  formData: FormData,
): Promise<Action_State_interface> {
  try {
    const id = Number(formData.get("id"));
    prisma.$transaction(async (tx) => {
      tx.attribute.delete({
        where: { id },
      });
    });

    revalidatePath("/attribute");
    return state;
  } catch (error) {
    return {
      ...state,
      error,
      success: false,
    };
  }
}
