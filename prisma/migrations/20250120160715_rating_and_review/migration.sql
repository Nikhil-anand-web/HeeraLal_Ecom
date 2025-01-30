-- CreateTable
CREATE TABLE `ratingAndReviews` (
    `id` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `showOnBanner` BOOLEAN NOT NULL,
    `message` LONGTEXT NOT NULL,
    `stars` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ratingAndReviews` ADD CONSTRAINT `ratingAndReviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
