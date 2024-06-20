/*
  Warnings:

  - The primary key for the `preference_rpg_style` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `preference_id` on the `preference_rpg_style` table. All the data in the column will be lost.
  - You are about to drop the `preference` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_preference_id,rpg_style_id]` on the table `preference_rpg_style` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_preference_id` to the `preference_rpg_style` table without a default value. This is not possible if the table is not empty.
  - Made the column `allow_message` on table `user_config` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "day_period" DROP CONSTRAINT "fk_preference_day_period";

-- DropForeignKey
ALTER TABLE "game_place" DROP CONSTRAINT "fk_preference_game_place";

-- DropForeignKey
ALTER TABLE "players_range" DROP CONSTRAINT "fk_preference_players_range";

-- DropForeignKey
ALTER TABLE "preference" DROP CONSTRAINT "fk_user_preference";

-- DropForeignKey
ALTER TABLE "preference_rpg_style" DROP CONSTRAINT "fk_preference_preference_rpg_style";

-- DropIndex
DROP INDEX "uq_preference_rpg_style_preference_id_rpg_style_id";

-- AlterTable
ALTER TABLE "preference_rpg_style" DROP CONSTRAINT "pk_preference_rpg_style",
DROP COLUMN "preference_id",
ADD COLUMN     "user_preference_id" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "pk_preference_rpg_style" PRIMARY KEY ("user_preference_id", "rpg_style_id");

-- AlterTable
ALTER TABLE "user_config" ALTER COLUMN "allow_message" SET NOT NULL;

-- DropTable
DROP TABLE "preference";

-- CreateTable
CREATE TABLE "user_preference" (
    "id" VARCHAR(50) NOT NULL,
    "frequency" "frequency" NOT NULL,
    "active_type" "active_tipe" NOT NULL,

    CONSTRAINT "pk_user_preference" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_preference_id" ON "user_preference"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_preference_rpg_style_user_preference_id_rpg_style_id" ON "preference_rpg_style"("user_preference_id", "rpg_style_id");

-- AddForeignKey
ALTER TABLE "day_period" ADD CONSTRAINT "fk_user_preference_day_period" FOREIGN KEY ("id") REFERENCES "user_preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "players_range" ADD CONSTRAINT "fk_user_preference_players_range" FOREIGN KEY ("id") REFERENCES "user_preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "game_place" ADD CONSTRAINT "fk_user_preference_game_place" FOREIGN KEY ("id") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_rpg_style" ADD CONSTRAINT "fk_user_preference_preference_rpg_style" FOREIGN KEY ("user_preference_id") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preference" ADD CONSTRAINT "fk_user_user_preference" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
