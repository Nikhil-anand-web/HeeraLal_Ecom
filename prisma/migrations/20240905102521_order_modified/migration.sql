/*
  Warnings:

  - You are about to alter the column `comboIds` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `comboIds` JSON NOT NULL;
