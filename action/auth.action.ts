"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const userName = formData.get("user") as string;
  const password = formData.get("password") as string;

  if (!userName || !password) {
    return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    // 1. ค้นหา User (ไม่ต้องใช้ Transaction เปลือง Connection)
    const user = await prisma.user.findFirst({
      where: { email: userName },
    });

    if (!user) {
      console.log("message: Invalid username or password");
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    // 2. ตรวจสอบรหัสผ่าน
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Email หรือ Password ไม่ถูกต้อง",
      };
    }

    // 3. สร้าง Token และบันทึก Session ลง Database
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

    await prisma.session.create({
      data: {
        id: token,
        expiresAt,
        createAt: new Date(),
        userId: user.id,
      },
    });

    // 4. เซ็ต Cookie (ย้ายออกมาอยู่นอก Database Transaction อย่างปลอดภัย)
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" };
  }

  // 5. สั่ง Redirect ออกมานอก Try-Catch (สำคัญมาก)
  redirect("/");
}
export async function Register(formdata: FormData) {
  const name = formdata.get("name") as string;
  const lastName = formdata.get("lastName") as string;
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const hash = bcrypt.hashSync(password, 10);
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          name,
          lastName,
          email,
          password: hash,
        },
      });
    });
  } catch (error) {
    console.log("error : ", error);
  }
}
