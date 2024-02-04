/*
  Warnings:

  - You are about to drop the `day_period` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "day_period" DROP CONSTRAINT "fk_user_preference_day_period";

-- DropTable
DROP TABLE "day_period";

-- CreateTable
CREATE TABLE "user_preference_day_period" (
    "id" VARCHAR(50) NOT NULL,
    "night" BOOLEAN NOT NULL DEFAULT false,
    "morning" BOOLEAN NOT NULL DEFAULT false,
    "afternoon" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pk_user_preference_day_period" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_preference_day_period_id" ON "user_preference_day_period"("id");

-- AddForeignKey
ALTER TABLE "user_preference_day_period" ADD CONSTRAINT "fk_user_preference_user_preference_day_period" FOREIGN KEY ("id") REFERENCES "user_preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
