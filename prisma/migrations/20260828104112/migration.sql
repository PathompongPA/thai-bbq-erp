/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `token` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserSession` DROP FOREIGN KEY `UserSession_sessionId_fkey`;

-- AlterTable
ALTER TABLE `Session` DROP PRIMARY KEY,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserSession` DROP PRIMARY KEY,
    MODIFY `sessionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `sessionId`);

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
