import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.role.create({
      data: {
        name: "admin",
      },
    });

    await tx.user.create({
      data: {
        name: "admin",
        lastName: "ThaiBBQ1999",
        email: process.env.APP_DEFAULT_EMAIL!,
        password: bcrypt.hashSync(process.env.APP_DEFAULT_PASSWORD!),
      },
    });
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
