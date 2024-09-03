-- CreateTable
CREATE TABLE `slider` (
    `id` VARCHAR(191) NOT NULL,
    `pageSlug` VARCHAR(191) NOT NULL,
    `displayOrder` INTEGER NOT NULL,
    `images` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banners` (
    `id` VARCHAR(191) NOT NULL,
    `pageSlug` VARCHAR(191) NOT NULL,
    `displayOrder` INTEGER NOT NULL,
    `images` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
