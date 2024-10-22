/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `types` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `types_name_key` ON `types`(`name`);
