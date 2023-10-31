/*
  Warnings:

  - You are about to drop the `Asists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Asists";

-- CreateTable
CREATE TABLE "Assets" (
    "id" SERIAL NOT NULL,
    "fileType" TEXT,
    "tags" JSONB[],
    "height" INTEGER,
    "width" INTEGER,
    "slug" TEXT,
    "fileName" TEXT,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "isImage" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminid" INTEGER,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);
