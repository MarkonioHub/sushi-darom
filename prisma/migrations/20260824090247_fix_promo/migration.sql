/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `promos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "promos_slug_key" ON "promos"("slug");
