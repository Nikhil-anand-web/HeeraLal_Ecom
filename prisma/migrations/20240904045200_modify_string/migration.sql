/*
  Warnings:

  - Added the required column `subTotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxes` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `shipingCharges` DOUBLE NULL,
    ADD COLUMN `subTotal` DOUBLE NOT NULL,
    ADD COLUMN `taxes` DOUBLE NOT NULL,
    MODIFY `couponMeta` JSON NULL;
