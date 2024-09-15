/*
  Warnings:

  - Added the required column `key` to the `staticInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `staticInfo` ADD COLUMN `key` VARCHAR(191) NOT NULL;
