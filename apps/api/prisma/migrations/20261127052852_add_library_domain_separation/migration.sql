-- CreateEnum
CREATE TYPE "LibraryDomain" AS ENUM ('KINH_SACH', 'LE_NHAC_DUONG');

-- AlterTable
ALTER TABLE "document_categories" ADD COLUMN     "domain" "LibraryDomain" NOT NULL DEFAULT 'KINH_SACH';

-- CreateIndex
CREATE INDEX "document_categories_domain_idx" ON "document_categories"("domain");
