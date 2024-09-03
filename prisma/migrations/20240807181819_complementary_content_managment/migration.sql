/*
  Warnings:

  - You are about to drop the column `blog` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `faqPost` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `recipes` on the `permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `blog`,
    DROP COLUMN `faqPost`,
    DROP COLUMN `recipes`,
    ADD COLUMN `complementaryContentManagment` BOOLEAN NOT NULL DEFAULT false;
