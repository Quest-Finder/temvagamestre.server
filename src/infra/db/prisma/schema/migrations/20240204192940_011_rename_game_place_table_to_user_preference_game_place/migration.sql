/*
  Warnings:

  - You are about to drop the `game_place` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "game_place" DROP CONSTRAINT "fk_user_preference_game_place";

-- DropTable
DROP TABLE "game_place";

-- CreateTable
CREATE TABLE "user_preference_game_place" (
    "id" VARCHAR(50) NOT NULL,
    "online" BOOLEAN NOT NULL DEFAULT false,
    "in_person" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pk_user_preference_game_place" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_preference_game_place_id" ON "user_preference_game_place"("id");

-- AddForeignKey
ALTER TABLE "user_preference_game_place" ADD CONSTRAINT "fk_user_preference_user_preference_game_place" FOREIGN KEY ("id") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
