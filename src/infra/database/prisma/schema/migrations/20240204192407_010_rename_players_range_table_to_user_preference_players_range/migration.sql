/*
  Warnings:

  - You are about to drop the `players_range` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "players_range" DROP CONSTRAINT "fk_user_preference_players_range";

-- DropTable
DROP TABLE "players_range";

-- CreateTable
CREATE TABLE "user_preference_players_range" (
    "id" VARCHAR(50) NOT NULL,
    "min_players" INTEGER NOT NULL,
    "max_players" INTEGER NOT NULL,

    CONSTRAINT "pk_user_preference_players_range" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_preference_players_range_id" ON "user_preference_players_range"("id");

-- AddForeignKey
ALTER TABLE "user_preference_players_range" ADD CONSTRAINT "fk_user_preference_user_preference_players_range" FOREIGN KEY ("id") REFERENCES "user_preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
