-- Rename `user_with_email` table to `auth`
ALTER TABLE "user_with_email"
RENAME TO "auth";

-- Drop `email` column
ALTER TABLE "user"
DROP COLUMN "email";

-- Add `auth_id` column
ALTER TABLE "user"
ADD COLUMN "auth_id" VARCHAR(50) NOT NULL;

-- Set `auth_id` column to `auth` table id
UPDATE "user"
SET "auth_id" = "auth".id
FROM "auth"
WHERE "auth".id = "user".auth_id;

-- Add `onboarding` column to `auth` table
ALTER TABLE "auth"
ADD COLUMN "onboarding" BOOLEAN NOT NULL DEFAULT TRUE;

-- Add `refresh_token` column to `auth` table
ALTER TABLE "auth"
ADD COLUMN "refresh_token" VARCHAR(255) NOT NULL DEFAULT '';

DROP TABLE "auth";