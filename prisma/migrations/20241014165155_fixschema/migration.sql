/*
  Warnings:

  - You are about to drop the column `end_time` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `plans` table. All the data in the column will be lost.
  - You are about to drop the `activity_thumbs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `activity_location_id` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `activity_thumbs` DROP FOREIGN KEY `activity_thumbs_activity_id_fkey`;

-- DropForeignKey
ALTER TABLE `plan_images` DROP FOREIGN KEY `plan_images_plan_id_fkey`;

-- AlterTable
ALTER TABLE `activities` DROP COLUMN `end_time`,
    DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    DROP COLUMN `name`,
    DROP COLUMN `start_time`,
    ADD COLUMN `activity_location_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `plans` DROP COLUMN `location`;

-- DropTable
DROP TABLE `activity_thumbs`;

-- DropTable
DROP TABLE `plan_images`;

-- CreateTable
CREATE TABLE `plan_on_province` (
    `plan_id` VARCHAR(191) NOT NULL,
    `province_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`plan_id`, `province_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provinces` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_locations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `open_at` DATETIME(3) NOT NULL,
    `close_at` DATETIME(3) NOT NULL,
    `longitude` DECIMAL(65, 30) NOT NULL,
    `latitude` DECIMAL(65, 30) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plan_on_province` ADD CONSTRAINT `plan_on_province_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plan_on_province` ADD CONSTRAINT `plan_on_province_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_activity_location_id_fkey` FOREIGN KEY (`activity_location_id`) REFERENCES `activity_locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
