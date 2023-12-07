-- CreateTable
CREATE TABLE "rpg_style" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(35) NOT NULL,

    CONSTRAINT "pk_rpg_style" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_rpg_style_id" ON "rpg_style"("id");

-- AddForeignKey
ALTER TABLE "rpg_style" ADD CONSTRAINT "fk_preference_rpg_style" FOREIGN KEY ("id") REFERENCES "preference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
