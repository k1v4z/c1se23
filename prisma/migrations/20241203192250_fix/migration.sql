/*
  Warnings:

  - You are about to drop the column `slackTokenId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `slackTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `slacktokens` DROP FOREIGN KEY `slackTokens_id_fkey`;

-- DropIndex
DROP INDEX `users_slackTokenId_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `slackTokenId`;

-- CreateIndex
CREATE UNIQUE INDEX `slackTokens_user_id_key` ON `slackTokens`(`user_id`);

-- AddForeignKey
ALTER TABLE `slackTokens` ADD CONSTRAINT `slackTokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
