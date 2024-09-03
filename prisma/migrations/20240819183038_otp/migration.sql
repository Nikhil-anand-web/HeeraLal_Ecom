/*
  Warnings:

  - You are about to drop the column `otp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `otpFor` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `otp`,
    DROP COLUMN `otpFor`,
    ADD COLUMN `otpEmail` VARCHAR(191) NULL,
    ADD COLUMN `otpMobile` VARCHAR(191) NULL;
