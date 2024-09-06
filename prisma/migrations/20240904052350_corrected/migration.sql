/*
  Warnings:

  - You are about to drop the column `productMeta` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `varientId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `varientIds` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `productMeta`,
    DROP COLUMN `varientId`,
    ADD COLUMN `varientIds` VARCHAR(191) NOT NULL;
