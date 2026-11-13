-- CreateEnum
CREATE TYPE "SiteType" AS ENUM ('TOA_THANH', 'DIEN_THO_PHAT_MAU', 'VUON_KY_THO', 'NHA_TU_TRUNG_THUA', 'NHA_TU_THUONG_THUA', 'NHA_TU_TRUNG_THUA_NAM', 'NHA_TU_TRUNG_THUA_NU', 'NHA_TU_THUONG_THUA_NAM', 'NHA_TU_THUONG_THUA_NU', 'THANH_THAT', 'HO_DAO', 'OTHER_SITE');

-- CreateEnum
CREATE TYPE "VisibilityLevel" AS ENUM ('PUBLIC_FEATURED', 'PUBLIC_COMPACT', 'INTERNAL_ONLY');

-- CreateEnum
CREATE TYPE "SiteSectionType" AS ENUM ('HISTORY', 'ARCHITECTURE', 'DIRECTIONS');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('UNVERIFIED', 'PENDING_VERIFICATION', 'VERIFIED', 'OFFICIALLY_CONFIRMED');

-- CreateTable
CREATE TABLE "organization_units" (
    "id" UUID NOT NULL,
    "parent_id" UUID,
    "name" VARCHAR(200) NOT NULL,
    "unit_type" VARCHAR(50) NOT NULL,
    "established_year" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "organization_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worship_sites" (
    "id" UUID NOT NULL,
    "org_unit_id" UUID,
    "slug" VARCHAR(120) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "other_names" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "site_type" "SiteType" NOT NULL,
    "is_featured_landmark" BOOLEAN NOT NULL DEFAULT false,
    "visibility_level" "VisibilityLevel" NOT NULL DEFAULT 'INTERNAL_ONLY',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "province" VARCHAR(100),
    "current_address" TEXT NOT NULL,
    "historic_address" TEXT,
    "directions_summary" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "image_url" VARCHAR(255),
    "image_caption" VARCHAR(255),
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "source_note" TEXT,
    "verified_by" UUID,
    "verified_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "worship_sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_detail_sections" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "section_type" "SiteSectionType" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content_markdown" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "source_citation" TEXT,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "site_detail_sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "worship_sites_slug_key" ON "worship_sites"("slug");

-- CreateIndex
CREATE INDEX "worship_sites_visibility_level_is_featured_landmark_display_idx" ON "worship_sites"("visibility_level", "is_featured_landmark", "display_order");

-- CreateIndex
CREATE INDEX "worship_sites_site_type_idx" ON "worship_sites"("site_type");

-- CreateIndex
CREATE INDEX "site_detail_sections_site_id_section_type_sort_order_idx" ON "site_detail_sections"("site_id", "section_type", "sort_order");

-- AddForeignKey
ALTER TABLE "organization_units" ADD CONSTRAINT "organization_units_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "organization_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worship_sites" ADD CONSTRAINT "worship_sites_org_unit_id_fkey" FOREIGN KEY ("org_unit_id") REFERENCES "organization_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_detail_sections" ADD CONSTRAINT "site_detail_sections_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "worship_sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
