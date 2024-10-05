/*
  Warnings:

  - You are about to drop the column `plansId` on the `notifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[activity_id]` on the table `notifications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_plansId_fkey`;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `plansId`;

-- CreateIndex
CREATE UNIQUE INDEX `notifications_activity_id_key` ON `notifications`(`activity_id`);
