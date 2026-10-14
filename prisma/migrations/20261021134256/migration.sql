/*
  Warnings:

  - Made the column `isActive` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true;
