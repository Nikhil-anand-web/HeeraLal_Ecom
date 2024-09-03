/*
  Warnings:

  - You are about to alter the column `weight` on the `varient` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `qty` on the `varient` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `minQtyForBulkOrder` on the `varient` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `varient` MODIFY `weight` INTEGER UNSIGNED NOT NULL,
    MODIFY `qty` INTEGER UNSIGNED NOT NULL,
    MODIFY `minQtyForBulkOrder` INTEGER UNSIGNED NOT NULL;
