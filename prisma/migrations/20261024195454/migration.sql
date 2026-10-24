/*
  Warnings:

  - You are about to drop the column `en_name` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Bill_of_material_items` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `Bill_of_material_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `materialId` to the `Bill_of_material_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Bill_of_material_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sequence` to the `Bill_of_material_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bill_of_material_items` DROP FOREIGN KEY `Bill_of_material_items_variantId_fkey`;

-- DropIndex
DROP INDEX `Attribute_en_name_key` ON `Attribute`;

-- DropIndex
DROP INDEX `Bill_of_material_items_variantId_fkey` ON `Bill_of_material_items`;

-- AlterTable
ALTER TABLE `Attribute` DROP COLUMN `en_name`,
    ADD COLUMN `code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Bill_of_material_items` DROP COLUMN `itemId`,
    DROP COLUMN `variantId`,
    ADD COLUMN `materialId` INTEGER NOT NULL,
    ADD COLUMN `note` VARCHAR(191) NULL,
    ADD COLUMN `quantity` DECIMAL(3, 3) NOT NULL,
    ADD COLUMN `sequence` INTEGER NOT NULL,
    ADD COLUMN `unitId` INTEGER NULL;

-- CreateTable
CREATE TABLE `AttributeValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `attributeId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Attribute_code_key` ON `Attribute`(`code`);

-- AddForeignKey
ALTER TABLE `AttributeValue` ADD CONSTRAINT `AttributeValue_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `Attribute`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill_of_material_items` ADD CONSTRAINT `Bill_of_material_items_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Item_Variant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bill_of_material_items` ADD CONSTRAINT `Bill_of_material_items_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
