-- AlterTable
ALTER TABLE `admin` ADD COLUMN `referedByUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_referedByUserId_fkey` FOREIGN KEY (`referedByUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
