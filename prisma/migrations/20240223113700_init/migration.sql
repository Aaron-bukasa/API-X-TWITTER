/*
  Warnings:

  - Made the column `thumbnailProfil` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bannere` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localisation` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "thumbnailProfil" SET NOT NULL,
ALTER COLUMN "bannere" SET NOT NULL,
ALTER COLUMN "localisation" SET NOT NULL,
ALTER COLUMN "website" SET NOT NULL;
