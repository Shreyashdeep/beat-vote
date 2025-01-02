/*
  Warnings:

  - The values [EndUser] on the enum `StreamType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `addedById` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StreamType_new" AS ENUM ('Spotify', 'Youtube');
ALTER TABLE "Stream" ALTER COLUMN "type" TYPE "StreamType_new" USING ("type"::text::"StreamType_new");
ALTER TYPE "StreamType" RENAME TO "StreamType_old";
ALTER TYPE "StreamType_new" RENAME TO "StreamType";
DROP TYPE "StreamType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "addedById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
