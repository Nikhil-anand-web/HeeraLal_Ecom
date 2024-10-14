/*
  Warnings:

  - A unique constraint covering the columns `[displayOrder]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `displayOrder` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `category_displayOrder_key` ON `category`(`displayOrder`);
