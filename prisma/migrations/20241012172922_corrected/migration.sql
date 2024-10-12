/*
  Warnings:

  - You are about to drop the column `brief` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `brief`;

-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `brief` LONGTEXT NULL;
