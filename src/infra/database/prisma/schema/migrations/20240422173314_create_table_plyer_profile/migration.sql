/*
  Warnings:

  - Added the required column `player_profile_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "player_profile_id" VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE "player_profile" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "pk_player_profile" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_player_profile_id" ON "player_profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "player_profile_name_key" ON "player_profile"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_player_profile_id_fkey" FOREIGN KEY ("player_profile_id") REFERENCES "player_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
