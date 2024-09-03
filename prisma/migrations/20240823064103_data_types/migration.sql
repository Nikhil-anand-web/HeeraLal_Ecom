/*
  Warnings:

  - Changed the type of `weight` on the `varient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `varient` DROP COLUMN `weight`,
    ADD COLUMN `weight` DECIMAL(10, 2) NOT NULL,
    MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `mrp` DECIMAL(10, 2) NOT NULL,
    MODIFY `wholeSalePrice` DECIMAL(10, 2) NOT NULL;
