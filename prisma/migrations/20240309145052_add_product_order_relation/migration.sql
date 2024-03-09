/*
  Warnings:

  - You are about to drop the column `basketId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `basket` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `basket` DROP FOREIGN KEY `Basket_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_basketId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `basketId`,
    ADD COLUMN `cartId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `basket`;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalAmount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Order_cartId_key` ON `Order`(`cartId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
