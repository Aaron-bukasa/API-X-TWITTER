/*
  Warnings:

  - Added the required column `username` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "thumbnailProfil" DROP NOT NULL,
ALTER COLUMN "bannere" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
