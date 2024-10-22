/*
  Warnings:

  - A unique constraint covering the columns `[name,address]` on the table `activity_locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `activity_locations_name_address_key` ON `activity_locations`(`name`, `address`);
