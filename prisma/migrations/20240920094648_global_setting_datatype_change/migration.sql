/*
  Warnings:

  - You are about to alter the column `value` on the `globalSettings` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `globalSettings` MODIFY `value` DOUBLE NOT NULL;
