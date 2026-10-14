/*
  Warnings:

  - A unique constraint covering the columns `[name_en]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `code` VARCHAR(191) NULL,
    ADD COLUMN `name_en` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Item_name_en_key` ON `Item`(`name_en`);

-- CreateIndex
CREATE UNIQUE INDEX `Item_code_key` ON `Item`(`code`);
