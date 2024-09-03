-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,
    `userUpdate` BOOLEAN NOT NULL DEFAULT false,
    `faqPost` BOOLEAN NOT NULL DEFAULT false,
    `categorySection` BOOLEAN NOT NULL DEFAULT false,
    `blog` BOOLEAN NOT NULL,
    `globalSetting` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
