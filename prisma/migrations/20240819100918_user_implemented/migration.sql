-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `pinCode` INTEGER NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `googleProfilePic` VARCHAR(191) NULL,
    `mobile` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL,
    `otp` INTEGER NOT NULL,
    `otpFor` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `mobileVerified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
