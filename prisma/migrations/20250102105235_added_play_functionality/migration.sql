/*
  Warnings:

  - Made the column `playedTs` on table `Stream` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "playedTs" SET NOT NULL;
