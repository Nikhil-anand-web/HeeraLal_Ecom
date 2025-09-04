-- CreateTable
CREATE TABLE `dealerShipForm` (
    `id` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `localArea` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firmName` VARCHAR(191) NOT NULL,
    `firmAddress` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `businessType` VARCHAR(191) NOT NULL,
    `annualSales` VARCHAR(191) NOT NULL,
    `investment` VARCHAR(191) NOT NULL,
    `hasManpower` BOOLEAN NOT NULL,
    `reason` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
