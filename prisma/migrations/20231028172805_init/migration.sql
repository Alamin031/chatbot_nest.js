-- AlterTable
ALTER TABLE "Asists" ALTER COLUMN "fileType" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "width" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "fileName" DROP NOT NULL,
ALTER COLUMN "mimeType" DROP NOT NULL,
ALTER COLUMN "fileSize" DROP NOT NULL,
ALTER COLUMN "createdBy" DROP NOT NULL;