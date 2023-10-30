-- CreateTable
CREATE TABLE "Asists" (
    "id" SERIAL NOT NULL,
    "fileType" TEXT NOT NULL,
    "tags" JSONB[],
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "isImage" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminid" INTEGER,

    CONSTRAINT "Asists_pkey" PRIMARY KEY ("id")
);
