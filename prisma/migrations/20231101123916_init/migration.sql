-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "carName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CarImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CarBrandImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CarLogos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CarImages_AB_unique" ON "_CarImages"("A", "B");

-- CreateIndex
CREATE INDEX "_CarImages_B_index" ON "_CarImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CarBrandImages_AB_unique" ON "_CarBrandImages"("A", "B");

-- CreateIndex
CREATE INDEX "_CarBrandImages_B_index" ON "_CarBrandImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CarLogos_AB_unique" ON "_CarLogos"("A", "B");

-- CreateIndex
CREATE INDEX "_CarLogos_B_index" ON "_CarLogos"("B");

-- AddForeignKey
ALTER TABLE "_CarImages" ADD CONSTRAINT "_CarImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarImages" ADD CONSTRAINT "_CarImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarBrandImages" ADD CONSTRAINT "_CarBrandImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarBrandImages" ADD CONSTRAINT "_CarBrandImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarLogos" ADD CONSTRAINT "_CarLogos_A_fkey" FOREIGN KEY ("A") REFERENCES "Assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarLogos" ADD CONSTRAINT "_CarLogos_B_fkey" FOREIGN KEY ("B") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
