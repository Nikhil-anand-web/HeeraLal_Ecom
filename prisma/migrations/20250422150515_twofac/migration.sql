-- CreateTable
CREATE TABLE `twoFactorAuthAdmin` (
    `id` VARCHAR(191) NOT NULL,
    `otpEmail` VARCHAR(191) NULL,
    `adminId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `twoFactorAuthAdmin` ADD CONSTRAINT `twoFactorAuthAdmin_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
