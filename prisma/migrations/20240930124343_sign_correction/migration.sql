/*
  Warnings:

  - You are about to alter the column `qty` on the `varient` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `varient` MODIFY `qty` INTEGER NOT NULL;
