-- DropForeignKey
ALTER TABLE `permissions` DROP FOREIGN KEY `permissions_adminId_fkey`;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
