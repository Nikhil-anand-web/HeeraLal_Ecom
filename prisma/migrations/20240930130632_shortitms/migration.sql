-- AlterTable
ALTER TABLE `orders` ADD COLUMN `shortItmStatus` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `shortItmsMeta` JSON NULL;
