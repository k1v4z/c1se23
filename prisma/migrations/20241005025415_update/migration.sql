/*
  Warnings:

  - You are about to drop the column `plan_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `activity_id` on the `plans` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity_id` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isChildren` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind_id` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `money` to the `plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportation` to the `plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_plan_id_fkey`;

-- DropForeignKey
ALTER TABLE `plans` DROP FOREIGN KEY `plans_activity_id_fkey`;

-- AlterTable
ALTER TABLE `activities` ADD COLUMN `latitude` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `longitude` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `plan_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `plan_id`,
    ADD COLUMN `activity_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `plansId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `plans` DROP COLUMN `activity_id`,
    ADD COLUMN `isChildren` BOOLEAN NOT NULL,
    ADD COLUMN `kind_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `money` INTEGER NOT NULL,
    ADD COLUMN `transportation` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `roleId` VARCHAR(191) NOT NULL,
    `permissionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kinds` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_thumbs` (
    `id` VARCHAR(191) NOT NULL,
    `activity_id` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,

    UNIQUE INDEX `activity_thumbs_activity_id_key`(`activity_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plans` ADD CONSTRAINT `plans_kind_id_fkey` FOREIGN KEY (`kind_id`) REFERENCES `kinds`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_plansId_fkey` FOREIGN KEY (`plansId`) REFERENCES `plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_thumbs` ADD CONSTRAINT `activity_thumbs_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
