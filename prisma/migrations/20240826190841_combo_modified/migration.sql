-- AlterTable
ALTER TABLE `combo` ADD COLUMN `qty` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `_cartTocombo` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_cartTocombo_AB_unique`(`A`, `B`),
    INDEX `_cartTocombo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_cartTocombo` ADD CONSTRAINT `_cartTocombo_A_fkey` FOREIGN KEY (`A`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_cartTocombo` ADD CONSTRAINT `_cartTocombo_B_fkey` FOREIGN KEY (`B`) REFERENCES `combo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
