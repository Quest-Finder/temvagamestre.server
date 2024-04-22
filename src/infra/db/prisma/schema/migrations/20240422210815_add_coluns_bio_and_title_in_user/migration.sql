/*
  Warnings:

  - The primary key for the `user_social_media` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "user_social_media" DROP CONSTRAINT "fk_social_media_user_social_media";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" VARCHAR(500),
ADD COLUMN     "title" VARCHAR(100);

-- AlterTable
ALTER TABLE "user_preference" ALTER COLUMN "frequency" SET DEFAULT 'weekly',
ALTER COLUMN "active_type" SET DEFAULT 'player';

-- AlterTable
ALTER TABLE "user_social_media" DROP CONSTRAINT "pk_user_social_media",
ALTER COLUMN "social_media_id" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "pk_user_social_media" PRIMARY KEY ("user_id", "social_media_id");

-- AddForeignKey
ALTER TABLE "user_social_media" ADD CONSTRAINT "fk_social_media_user_social_media" FOREIGN KEY ("social_media_id") REFERENCES "social_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
