/*
  Warnings:

  - Added the required column `productId` to the `ratingAndReviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ratingAndReviews` ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ratingAndReviews` ADD CONSTRAINT `ratingAndReviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
