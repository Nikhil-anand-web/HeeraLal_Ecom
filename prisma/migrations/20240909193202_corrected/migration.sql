/*
  Warnings:

  - You are about to drop the column `referedByUserId` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `referal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `admin_referedByUserId_fkey`;

-- DropForeignKey
ALTER TABLE `referal` DROP FOREIGN KEY `referal_adminId_fkey`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `referedByUserId`;

-- AlterTable
ALTER TABLE `referal` DROP COLUMN `adminId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `referedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_referedById_fkey` FOREIGN KEY (`referedById`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
