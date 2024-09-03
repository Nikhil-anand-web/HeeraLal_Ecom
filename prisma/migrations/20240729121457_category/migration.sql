/*
  Warnings:

  - Added the required column `createrId` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createrId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `category` ADD CONSTRAINT `category_createrId_fkey` FOREIGN KEY (`createrId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
