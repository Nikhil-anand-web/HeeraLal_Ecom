-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
