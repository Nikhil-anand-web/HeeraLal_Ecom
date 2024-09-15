/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `referal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `referal_userId_key` ON `referal`(`userId`);
