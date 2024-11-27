-- AlterTable
ALTER TABLE `users` ADD COLUMN `last_login` DATETIME(3) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL;
