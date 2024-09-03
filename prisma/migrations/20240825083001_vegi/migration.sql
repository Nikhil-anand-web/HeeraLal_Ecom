-- DropForeignKey
ALTER TABLE `cartItem` DROP FOREIGN KEY `cartItem_varientId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `isVegiterian` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `cartItem` ADD CONSTRAINT `cartItem_varientId_fkey` FOREIGN KEY (`varientId`) REFERENCES `varient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
