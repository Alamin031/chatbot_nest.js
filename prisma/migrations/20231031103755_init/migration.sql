/*
  Warnings:

  - You are about to drop the column `adminid` on the `Assets` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Country` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Assets` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `Assets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileName` on table `Assets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mimeType` on table `Assets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Assets" DROP COLUMN "adminid",
ADD COLUMN     "countryId" INTEGER NOT NULL,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "fileName" SET NOT NULL,
ALTER COLUMN "mimeType" SET NOT NULL,
ALTER COLUMN "isImage" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "icon";

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
