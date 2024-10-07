/*
  Warnings:

  - Added the required column `adminId` to the `faqs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `faqs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `faqs` ADD COLUMN `adminId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `faqs` ADD CONSTRAINT `faqs_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
