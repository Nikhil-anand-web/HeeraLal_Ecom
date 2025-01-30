-- AlterTable
ALTER TABLE `ratingAndReviews` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `showOnBanner` BOOLEAN NOT NULL DEFAULT false;
