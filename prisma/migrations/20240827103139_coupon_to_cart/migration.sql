-- AlterTable
ALTER TABLE `cart` ADD COLUMN `couponId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
