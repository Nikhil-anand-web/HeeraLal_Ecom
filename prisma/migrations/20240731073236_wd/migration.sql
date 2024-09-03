/*
  Warnings:

  - You are about to drop the column `createrId` on the `category` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_createrId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `createrId`,
    ADD COLUMN `creatorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
