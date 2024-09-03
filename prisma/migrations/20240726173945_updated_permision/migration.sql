/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `permissions_adminId_key` ON `permissions`(`adminId`);
