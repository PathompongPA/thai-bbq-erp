import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("กำลังทดสอบเชื่อมต่อ Database...");
  const count = await prisma.user.count();
  console.log("✅ เชื่อมต่อสำเร็จ! จำนวน User ในระบบตอนนี้:", count);
}

main()
  .catch((e) => {
    console.error("❌ เชื่อมต่อพัง:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
