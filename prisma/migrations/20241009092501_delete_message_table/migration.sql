/*
  Warnings:

  - You are about to drop the column `message_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_message_id_fkey`;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `message_id`,
    ADD COLUMN `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `message` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `messages`;
