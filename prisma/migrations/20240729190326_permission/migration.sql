/*
  Warnings:

  - You are about to drop the column `categorySection` on the `permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `categorySection`,
    ADD COLUMN `productAndInventory` BOOLEAN NOT NULL DEFAULT false;
