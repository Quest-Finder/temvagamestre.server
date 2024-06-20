/*
  Warnings:

  - You are about to drop the `preference_rpg_style` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "preference_rpg_style" DROP CONSTRAINT "fk_rpg_style_preference_rpg_style";

-- DropForeignKey
ALTER TABLE "preference_rpg_style" DROP CONSTRAINT "fk_user_preference_preference_rpg_style";

-- DropTable
DROP TABLE "preference_rpg_style";

-- CreateTable
CREATE TABLE "user_preference_rpg_style" (
    "user_preference_id" VARCHAR(50) NOT NULL,
    "rpg_style_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "pk_puser_preference_rpg_style" PRIMARY KEY ("user_preference_id","rpg_style_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_preference_rpg_style_user_preference_id_rpg_style_id" ON "user_preference_rpg_style"("user_preference_id", "rpg_style_id");

-- AddForeignKey
ALTER TABLE "user_preference_rpg_style" ADD CONSTRAINT "fk_user_preference_user_preference_rpg_style" FOREIGN KEY ("user_preference_id") REFERENCES "user_preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preference_rpg_style" ADD CONSTRAINT "fk_rpg_style_user_preference_rpg_style" FOREIGN KEY ("rpg_style_id") REFERENCES "rpg_style"("id") ON DELETE CASCADE ON UPDATE CASCADE;
