-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `CustomerMeta` JSON NULL,
    `productIds` JSON NOT NULL,
    `productMeta` JSON NOT NULL,
    `couponMeta` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `PaymentMode` VARCHAR(191) NULL,
    `paymentToken` JSON NULL,
    `paymentStatus` INTEGER NOT NULL DEFAULT 0,
    `orderStatus` INTEGER NOT NULL DEFAULT 0,
    `shipingStatus` VARCHAR(191) NOT NULL DEFAULT 'initiated',
    `awb` VARCHAR(191) NULL,

    UNIQUE INDEX `orders_orderId_key`(`orderId`),
    UNIQUE INDEX `orders_awb_key`(`awb`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
