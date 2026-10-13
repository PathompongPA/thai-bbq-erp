import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function createPermission(tx: Prisma.TransactionClient) {
  const resources = ["attribute", "item", "variant"];

  const actions = ["view", "create", "update", "delete"];

  for (const resource of resources) {
    for (const action of actions) {
      await tx.permission.upsert({
        where: {
          resource_action: {
            resource,
            action,
          },
        },
        update: {},
        create: {
          resource,
          action,
        },
      });
    }
  }
}

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

    const item_type_product = await tx.item_type.create({
      data: {
        name: "product",
        code: "P",
      },
    });
    const item_type_material = await tx.item_type.create({
      data: {
        name: "material",
        code: "M",
      },
    });

    const attribute_size = await tx.attribute.create({
      data: {
        name: "ขนาด",
      },
    });

    const attribute_flavor = await tx.attribute.create({
      data: {
        name: "รสชาติ",
      },
    });

    const supplier_makro = await tx.supplier.create({
      data: {
        name: "makro",
      },
    });

    const warehouse_type_freeze = await tx.warehouse_type.create({
      data: { name: "แช่แข็ง (Freeze)" },
    });

    const item_pork_ripe = await tx.item.create({
      data: {
        name: "Pork ripe",
        day_of_inventory: 30,

        item_typeId: item_type_product.id,
        warehouse_typeId: warehouse_type_freeze.id,
        supplierId: supplier_makro.id,
      },
    });
    await tx.item_attribute.createMany({
      data: [
        {
          itemId: item_pork_ripe.id,
          attributeId: attribute_flavor.id,
        },
        {
          itemId: item_pork_ripe.id,
          attributeId: attribute_size.id,
        },
      ],
    });
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
