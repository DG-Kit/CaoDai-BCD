-- CreateEnum
CREATE TYPE "DocumentEditionStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'IN_REVIEW', 'REVISION_REQUIRED', 'APPROVED', 'PUBLISHED', 'ARCHIVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DocumentFileType" AS ENUM ('SCAN_ORIGINAL_PDF', 'OPTIMIZED_PDF', 'SCAN_IMAGE', 'AUDIO_MP3', 'COVER_IMAGE');

-- CreateTable
CREATE TABLE "document_categories" (
    "id" UUID NOT NULL,
    "parent_id" UUID,
    "slug" VARCHAR(120) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "document_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author_or_issuing_body" VARCHAR(255),
    "summary" TEXT,
    "historical_origin" TEXT,
    "is_comparative_reference" BOOLEAN NOT NULL DEFAULT false,
    "ritual_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "purpose_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "timing_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "deleted_at" TIMESTAMPTZ,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_editions" (
    "id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "edition_label" VARCHAR(200) NOT NULL,
    "publication_year" INTEGER,
    "publisher" VARCHAR(200),
    "isbn" VARCHAR(50),
    "registration_code" VARCHAR(120),
    "editorial_team" TEXT,
    "source_name" VARCHAR(255),
    "archive_reference" VARCHAR(255),
    "usage_permission" VARCHAR(50) DEFAULT 'PUBLIC_READ',
    "status" "DocumentEditionStatus" NOT NULL DEFAULT 'DRAFT',
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "published_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "document_editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_files" (
    "id" UUID NOT NULL,
    "edition_id" UUID NOT NULL,
    "section_id" UUID,
    "file_type" "DocumentFileType" NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "storage_path" VARCHAR(500) NOT NULL,
    "checksum_sha256" VARCHAR(64),
    "file_size_bytes" INTEGER,
    "mime_type" VARCHAR(100),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_sections" (
    "id" UUID NOT NULL,
    "edition_id" UUID NOT NULL,
    "parent_id" UUID,
    "slug" VARCHAR(150) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "printed_page_label" VARCHAR(30),
    "pdf_page_start" INTEGER,
    "pdf_page_end" INTEGER,
    "ritual_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "purpose_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "timing_tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tune_type" VARCHAR(100),

    CONSTRAINT "document_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_contents" (
    "id" UUID NOT NULL,
    "section_id" UUID NOT NULL,
    "content_markdown" TEXT NOT NULL,
    "plain_text" TEXT NOT NULL,
    "original_scan_page_ref" VARCHAR(100),
    "editorial_note" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "document_contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "document_categories_slug_key" ON "document_categories"("slug");

-- CreateIndex
CREATE INDEX "document_categories_display_order_idx" ON "document_categories"("display_order");

-- CreateIndex
CREATE UNIQUE INDEX "documents_slug_key" ON "documents"("slug");

-- CreateIndex
CREATE INDEX "documents_category_id_idx" ON "documents"("category_id");

-- CreateIndex
CREATE INDEX "document_editions_document_id_status_idx" ON "document_editions"("document_id", "status");

-- CreateIndex
CREATE INDEX "document_files_edition_id_file_type_idx" ON "document_files"("edition_id", "file_type");

-- CreateIndex
CREATE INDEX "document_files_section_id_idx" ON "document_files"("section_id");

-- CreateIndex
CREATE INDEX "document_sections_edition_id_order_index_idx" ON "document_sections"("edition_id", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "document_sections_edition_id_slug_key" ON "document_sections"("edition_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "document_contents_section_id_key" ON "document_contents"("section_id");

-- AddForeignKey
ALTER TABLE "document_categories" ADD CONSTRAINT "document_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "document_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "document_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_editions" ADD CONSTRAINT "document_editions_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_files" ADD CONSTRAINT "document_files_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "document_editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_files" ADD CONSTRAINT "document_files_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "document_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_sections" ADD CONSTRAINT "document_sections_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "document_editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_sections" ADD CONSTRAINT "document_sections_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "document_sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_contents" ADD CONSTRAINT "document_contents_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "document_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
