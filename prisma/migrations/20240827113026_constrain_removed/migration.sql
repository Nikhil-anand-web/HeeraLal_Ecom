/*
  Warnings:

  - You are about to drop the `_cartTocombo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_cartTocombo` DROP FOREIGN KEY `_cartTocombo_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cartTocombo` DROP FOREIGN KEY `_cartTocombo_B_fkey`;

-- DropTable
DROP TABLE `_cartTocombo`;
