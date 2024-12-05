/*
  Warnings:

  - You are about to drop the column `channelId` on the `users` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `slackTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `slacktokens` ADD COLUMN `channelId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `channelId`,
    ADD COLUMN `avatar` VARCHAR(191) NULL;
