/*
  Warnings:

  - Added the required column `closingTime` to the `restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingTime` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "closingTime" TEXT NOT NULL,
ADD COLUMN     "openingTime" TEXT NOT NULL;
