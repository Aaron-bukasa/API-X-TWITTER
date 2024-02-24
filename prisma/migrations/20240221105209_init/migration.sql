/*
  Warnings:

  - You are about to drop the column `published` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Tweet` table. All the data in the column will be lost.
  - Added the required column `thumbnailProfil` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "thumbnailProfil" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "authorId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
