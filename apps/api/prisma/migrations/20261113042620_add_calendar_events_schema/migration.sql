-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('MAJOR_HOLIDAY', 'COMMEMORATION', 'TRADITIONAL_FESTIVAL');

-- CreateTable
CREATE TABLE "religious_events" (
    "id" UUID NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" "EventCategory" NOT NULL DEFAULT 'MAJOR_HOLIDAY',
    "is_recurring" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "religious_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_rules" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "is_lunar" BOOLEAN NOT NULL DEFAULT true,
    "lunar_month" INTEGER,
    "lunar_day_start" INTEGER,
    "lunar_day_end" INTEGER,
    "solar_month" INTEGER,
    "solar_day_start" INTEGER,
    "solar_day_end" INTEGER,
    "apply_leap_month" BOOLEAN NOT NULL DEFAULT false,
    "date_range_str" VARCHAR(100),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calendar_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_occurrences" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "solar_date" DATE NOT NULL,
    "lunar_date_str" VARCHAR(50) NOT NULL,
    "can_chi_day" VARCHAR(50),
    "can_chi_month" VARCHAR(50),
    "can_chi_year" VARCHAR(50),
    "is_major_holiday" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_occurrences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "religious_events_code_key" ON "religious_events"("code");

-- CreateIndex
CREATE INDEX "event_occurrences_solar_date_idx" ON "event_occurrences"("solar_date");

-- CreateIndex
CREATE UNIQUE INDEX "event_occurrences_event_id_solar_date_key" ON "event_occurrences"("event_id", "solar_date");

-- AddForeignKey
ALTER TABLE "calendar_rules" ADD CONSTRAINT "calendar_rules_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "religious_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_occurrences" ADD CONSTRAINT "event_occurrences_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "religious_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
