-- DropForeignKey
ALTER TABLE "Assets" DROP CONSTRAINT "Assets_countryId_fkey";

-- AlterTable
ALTER TABLE "Assets" ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
