-- CreateTable
CREATE TABLE `plan_images` (
    `id` VARCHAR(191) NOT NULL,
    `plan_id` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,

    UNIQUE INDEX `plan_images_plan_id_key`(`plan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plan_images` ADD CONSTRAINT `plan_images_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
