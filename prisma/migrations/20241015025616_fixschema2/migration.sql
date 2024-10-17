/*
  Warnings:

  - You are about to drop the `location_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location_type_id` to the `activity_locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity_locations` ADD COLUMN `location_type_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `location_types`;

-- CreateTable
CREATE TABLE `locationOnTypes` (
    `activity_location_id` VARCHAR(191) NOT NULL,
    `type_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `locationOnTypes_activity_location_id_type_id_key`(`activity_location_id`, `type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `locationOnTypes` ADD CONSTRAINT `locationOnTypes_activity_location_id_fkey` FOREIGN KEY (`activity_location_id`) REFERENCES `activity_locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `locationOnTypes` ADD CONSTRAINT `locationOnTypes_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
