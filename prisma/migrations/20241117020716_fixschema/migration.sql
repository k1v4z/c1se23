/*
  Warnings:

  - You are about to drop the column `channel` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `channel_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `channel_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `channel`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `channelId` VARCHAR(191) NULL;
