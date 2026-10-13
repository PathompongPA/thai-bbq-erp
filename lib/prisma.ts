import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: Number(process.env.DB_PORT),
  user: "root",
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
