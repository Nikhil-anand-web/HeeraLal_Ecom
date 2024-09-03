/*
  Warnings:

  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `faqs` MODIFY `status` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `faq`;
