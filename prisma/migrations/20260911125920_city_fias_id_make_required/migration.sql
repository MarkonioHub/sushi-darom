/*
  Warnings:

  - Made the column `fiasId` on table `cities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cities" ALTER COLUMN "fiasId" SET NOT NULL;
