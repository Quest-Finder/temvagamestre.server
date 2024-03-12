/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `social_media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[baseUri]` on the table `social_media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baseUri` to the `social_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "social_media" ADD COLUMN     "baseUri" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "uq_social_media_name" ON "social_media"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uq_social_media_base_uri" ON "social_media"("baseUri");
