/*
  Warnings:

  - You are about to drop the column `cartId` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartItemId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_cartId_fkey`;

-- AlterTable
ALTER TABLE `cart` ADD COLUMN `cartItemId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `cartId`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `cartId`,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_productId_key` ON `Order`(`productId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_cartItemId_fkey` FOREIGN KEY (`cartItemId`) REFERENCES `CartItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
