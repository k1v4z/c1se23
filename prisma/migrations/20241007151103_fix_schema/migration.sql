/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `kinds` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `kinds_id_key` ON `kinds`;

-- DropIndex
DROP INDEX `users_id_key` ON `users`;

-- CreateIndex
CREATE UNIQUE INDEX `kinds_name_key` ON `kinds`(`name`);
