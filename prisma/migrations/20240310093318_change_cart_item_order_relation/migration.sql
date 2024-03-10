/*
  Warnings:

  - You are about to drop the column `productId` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartItemId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartItemId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_productId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `productId`,
    ADD COLUMN `cartItemId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_cartItemId_key` ON `Order`(`cartItemId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartItemId_fkey` FOREIGN KEY (`cartItemId`) REFERENCES `CartItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
