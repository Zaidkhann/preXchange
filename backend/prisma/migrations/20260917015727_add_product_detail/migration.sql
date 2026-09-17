/*
  Warnings:

  - Made the column `userName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `productDetail` JSON NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `userName` VARCHAR(191) NOT NULL;
