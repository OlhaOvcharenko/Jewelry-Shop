/*
  Warnings:

  - Added the required column `size` to the `BagItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bagitem` ADD COLUMN `sessionId` VARCHAR(191) NULL,
    ADD COLUMN `size` VARCHAR(191) NOT NULL;
