/*
  Warnings:

  - You are about to drop the column `image` on the `Categorie` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `blog` table. All the data in the column will be lost.
  - Added the required column `thumbnailImage` to the `Categorie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailImage` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Categorie` DROP COLUMN `image`,
    ADD COLUMN `thumbnailImage` JSON NOT NULL;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `thumbnail`,
    ADD COLUMN `thumbnailImage` JSON NOT NULL;
