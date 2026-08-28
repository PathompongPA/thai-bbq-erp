"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const userName = formData.get("user") as string;
  const password = formData.get("password") as string;
  console.log("user , password : ", userName, password);

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findFirst({
        where: {
          email: userName,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "Invalid username or password",
        };
      }

      const hashPassword = user?.password;
      const isPasswordValid = bcrypt.compareSync(password, hashPassword);

      if (!isPasswordValid) {
        throw new Error("Email หรือ Password ไม่ถูกต้อง");
      }

      const token = crypto.randomBytes(32).toString("hex");

      const expiresAt = new Date(Date.now() + 4 * 60 * 60 * 1000);

      await tx.session.create({
        data: {
          id: token,
          expiresAt,
          createAt: new Date(),
          userId: user.id,
        },
      });

      const cookieStore = await cookies();

      cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
      });
    });
  } catch (error) {
    console.log(error);
  }
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
