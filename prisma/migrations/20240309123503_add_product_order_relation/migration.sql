/*
  Warnings:

  - You are about to drop the column `bagId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `bagId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `bag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collection` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_bagId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_bagId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `bagId`,
    ADD COLUMN `productId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `bagId`,
    ADD COLUMN `collection` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `bag`;

-- CreateIndex
CREATE UNIQUE INDEX `Order_productId_key` ON `Order`(`productId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
