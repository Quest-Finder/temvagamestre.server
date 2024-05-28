-- CreateEnum
CREATE TYPE "experience_level" AS ENUM ('beginner', 'experient', 'consecrated_warrior', 'epico');

-- CreateTable
CREATE TABLE "master" (
    "id" VARCHAR(50) NOT NULL,
    "experience_level" "experience_level" NOT NULL,
    "player_experience_level" "experience_level" NOT NULL,

    CONSTRAINT "pk_master" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_game_systems" (
    "master_id" VARCHAR(50) NOT NULL,
    "game_system_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "pk_master_game_systems" PRIMARY KEY ("master_id","game_system_id")
);

-- CreateTable
CREATE TABLE "game_systems" (
    "id" VARCHAR(50) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pk_game_systems" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_table" (
    "id" VARCHAR(50) NOT NULL,
    "master_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "pk_game_table" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_master" ON "master"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_game_systems" ON "game_systems"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_game_table" ON "game_table"("id");

-- AddForeignKey
ALTER TABLE "master" ADD CONSTRAINT "fk_user_master" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "master_game_systems" ADD CONSTRAINT "master_game_systems_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_game_systems" ADD CONSTRAINT "master_game_systems_game_system_id_fkey" FOREIGN KEY ("game_system_id") REFERENCES "game_systems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_table" ADD CONSTRAINT "game_table_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
