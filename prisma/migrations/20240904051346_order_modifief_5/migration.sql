/*
  Warnings:

  - You are about to alter the column `comboMeta` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `varientId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `varientMeta` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `varientId` VARCHAR(191) NOT NULL,
    ADD COLUMN `varientMeta` JSON NOT NULL,
    MODIFY `comboMeta` JSON NOT NULL;
