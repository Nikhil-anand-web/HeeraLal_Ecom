/*
  Warnings:

  - You are about to drop the column `isUsed` on the `referal` table. All the data in the column will be lost.
  - Added the required column `userId` to the `referal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `referal` DROP COLUMN `isUsed`,
    ADD COLUMN `coins` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `referal` ADD CONSTRAINT `referal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
