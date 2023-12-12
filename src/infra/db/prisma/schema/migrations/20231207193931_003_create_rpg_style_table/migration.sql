-- CreateTable
CREATE TABLE "rpg_style" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(35) NOT NULL,

    CONSTRAINT "pk_rpg_style" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preference_rpg_style" (
    "preference_id" VARCHAR(50) NOT NULL,
    "rpg_style_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "pk_preference_rpg_style" PRIMARY KEY ("preference_id","rpg_style_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_rpg_style_id" ON "rpg_style"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_preference_rpg_style_preference_id_rpg_style_id" ON "preference_rpg_style"("preference_id", "rpg_style_id");

-- AddForeignKey
ALTER TABLE "preference_rpg_style" ADD CONSTRAINT "fk_preference_preference_rpg_style" FOREIGN KEY ("preference_id") REFERENCES "preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preference_rpg_style" ADD CONSTRAINT "fk_rpg_style_preference_rpg_style" FOREIGN KEY ("rpg_style_id") REFERENCES "rpg_style"("id") ON DELETE CASCADE ON UPDATE CASCADE;
