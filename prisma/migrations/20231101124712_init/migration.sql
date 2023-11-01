/*
  Warnings:

  - You are about to drop the `_CarBrandImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CarImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CarLogos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CarBrandImages" DROP CONSTRAINT "_CarBrandImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarBrandImages" DROP CONSTRAINT "_CarBrandImages_B_fkey";

-- DropForeignKey
ALTER TABLE "_CarImages" DROP CONSTRAINT "_CarImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarImages" DROP CONSTRAINT "_CarImages_B_fkey";

-- DropForeignKey
ALTER TABLE "_CarLogos" DROP CONSTRAINT "_CarLogos_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarLogos" DROP CONSTRAINT "_CarLogos_B_fkey";

-- AlterTable
ALTER TABLE "Assets" ADD COLUMN     "carId" INTEGER;

-- DropTable
DROP TABLE "_CarBrandImages";

-- DropTable
DROP TABLE "_CarImages";

-- DropTable
DROP TABLE "_CarLogos";

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "carImages_FK" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "brandImages_FK" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "carLogos_FK" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
