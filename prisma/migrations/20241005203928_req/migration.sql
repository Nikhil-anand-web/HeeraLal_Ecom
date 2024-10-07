-- AlterTable
ALTER TABLE `orders` ADD COLUMN `cancellationRequestMeta` JSON NULL,
    ADD COLUMN `cancellationRequestStatus` INTEGER NOT NULL DEFAULT 0;
