/*
  Warnings:

  - A unique constraint covering the columns `[fiasId]` on the table `cities` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "fiasId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "cities_fiasId_key" ON "cities"("fiasId");
