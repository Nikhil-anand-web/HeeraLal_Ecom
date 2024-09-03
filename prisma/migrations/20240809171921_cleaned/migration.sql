/*
  Warnings:

  - You are about to drop the `Categorie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Categorie` DROP FOREIGN KEY `Categorie_parentId_fkey`;

-- DropTable
DROP TABLE `Categorie`;
