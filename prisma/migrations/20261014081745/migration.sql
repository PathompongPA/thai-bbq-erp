/*
  Warnings:

  - A unique constraint covering the columns `[name_en]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name_en` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Unit` ADD COLUMN `name_en` VARCHAR(191) NOT NULL,
    ADD COLUMN `symbol` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Unit_name_en_key` ON `Unit`(`name_en`);

-- CreateIndex
CREATE UNIQUE INDEX `Unit_symbol_key` ON `Unit`(`symbol`);
