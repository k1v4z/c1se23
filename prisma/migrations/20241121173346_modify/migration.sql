/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `activity_locations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slackTokenId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `money` to the `activity_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity_locations` ADD COLUMN `money` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `slackTokenId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `slackTokens` (
    `id` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `activity_locations_address_key` ON `activity_locations`(`address`);

-- CreateIndex
CREATE UNIQUE INDEX `users_slackTokenId_key` ON `users`(`slackTokenId`);

-- AddForeignKey
ALTER TABLE `slackTokens` ADD CONSTRAINT `slackTokens_id_fkey` FOREIGN KEY (`id`) REFERENCES `users`(`slackTokenId`) ON DELETE RESTRICT ON UPDATE CASCADE;
