/*
  Warnings:

  - You are about to drop the column `game_place` on the `preference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "preference" DROP COLUMN "game_place";

-- DropEnum
DROP TYPE "game_place";

-- CreateTable
CREATE TABLE "game_place" (
    "id" VARCHAR(50) NOT NULL,
    "online" BOOLEAN NOT NULL DEFAULT false,
    "in_person" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pk_game_place" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_game_place_id" ON "game_place"("id");

-- AddForeignKey
ALTER TABLE "game_place" ADD CONSTRAINT "fk_preference_game_place" FOREIGN KEY ("id") REFERENCES "preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
