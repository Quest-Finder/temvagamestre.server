-- CreateEnum
CREATE TYPE "active_tipe" AS ENUM ('player', 'game_master');

-- CreateEnum
CREATE TYPE "game_place" AS ENUM ('online', 'in_person');

-- CreateEnum
CREATE TYPE "frequency" AS ENUM ('daily', 'weekly', 'monthly');

-- CreateTable
CREATE TABLE "adress" (
    "id" VARCHAR(50) NOT NULL,
    "country" VARCHAR(15) NOT NULL,
    "state" VARCHAR(15),
    "city" VARCHAR(30),

    CONSTRAINT "pk_address" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badge" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "criteria" VARCHAR(50) NOT NULL,
    "icon" VARCHAR(30) NOT NULL,

    CONSTRAINT "pk_badge" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "day_period" (
    "id" VARCHAR(50) NOT NULL,
    "night" BOOLEAN NOT NULL DEFAULT false,
    "morning" BOOLEAN NOT NULL DEFAULT false,
    "afternoon" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pk_day_period" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players_range" (
    "id" VARCHAR(50) NOT NULL,
    "min_players" INTEGER NOT NULL,
    "max_players" INTEGER NOT NULL,

    CONSTRAINT "pk_players_range" PRIMARY KEY ("id"),
    CONSTRAINT "check_min_max_players" CHECK ("min_players" <= "max_players")
);

-- CreateTable
CREATE TABLE "preference" (
    "id" VARCHAR(50) NOT NULL,
    "frequency" "frequency" NOT NULL,
    "game_place" "game_place" NOT NULL,
    "active_type" "active_tipe" NOT NULL,

    CONSTRAINT "pk_preference" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "pk_social_media" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(50) NOT NULL,
    "address_id" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(25) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "nickname" VARCHAR(25) NOT NULL,
    "phone" VARCHAR(20),
    "date_of_birth" DATE NOT NULL,

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badge" (
    "user_id" VARCHAR(50) NOT NULL,
    "badge_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "pk_user_badge" PRIMARY KEY ("user_id","badge_id")
);

-- CreateTable
CREATE TABLE "user_config" (
    "id" VARCHAR(50) NOT NULL,
    "allow_message" BOOLEAN DEFAULT false,

    CONSTRAINT "pk_user_config" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_social_media" (
    "user_id" VARCHAR(50) NOT NULL,
    "social_media_id" VARCHAR(20) NOT NULL,
    "link" VARCHAR(100) NOT NULL,

    CONSTRAINT "pk_user_social_media" PRIMARY KEY ("user_id","social_media_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_adress_id" ON "adress"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_badge_id" ON "badge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_day_period_id" ON "day_period"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_players_range_id" ON "players_range"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_preference_id" ON "preference"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_social_media_id" ON "social_media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_id" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_badge_user_id_badge_id" ON "user_badge"("user_id", "badge_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_config_id" ON "user_config"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_social_media_user_id_social_media_id" ON "user_social_media"("user_id", "social_media_id");

-- AddForeignKey
ALTER TABLE "day_period" ADD CONSTRAINT "fk_preference_day_period" FOREIGN KEY ("id") REFERENCES "preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "players_range" ADD CONSTRAINT "fk_preference_players_range" FOREIGN KEY ("id") REFERENCES "preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preference" ADD CONSTRAINT "fk_user_preference" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_address_user" FOREIGN KEY ("address_id") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_badge" ADD CONSTRAINT "fk_badge_user_badge" FOREIGN KEY ("badge_id") REFERENCES "badge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_badge" ADD CONSTRAINT "fk_user_user_badge" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_config" ADD CONSTRAINT "fk_user_user_config" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_social_media" ADD CONSTRAINT "fk_social_media_user_social_media" FOREIGN KEY ("social_media_id") REFERENCES "social_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_social_media" ADD CONSTRAINT "fk_user_user_social_media" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
