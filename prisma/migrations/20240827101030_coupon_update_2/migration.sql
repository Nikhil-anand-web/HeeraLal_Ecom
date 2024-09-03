/*
  Warnings:

  - You are about to drop the column `discountvalue` on the `coupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `coupons` DROP COLUMN `discountvalue`,
    ADD COLUMN `discountValue` DOUBLE NOT NULL DEFAULT 0;
