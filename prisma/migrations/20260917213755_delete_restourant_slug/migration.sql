/*
  Warnings:

  - You are about to drop the column `slug` on the `restaurants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cityId]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "restaurants_cityId_slug_key";

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "slug";

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_cityId_key" ON "restaurants"("cityId");
