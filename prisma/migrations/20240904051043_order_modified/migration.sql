/*
  Warnings:

  - Added the required column `comboIds` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comboMeta` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `comboIds` VARCHAR(191) NOT NULL,
    ADD COLUMN `comboMeta` VARCHAR(191) NOT NULL;
