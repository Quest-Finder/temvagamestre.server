-- AlterTable
ALTER TABLE "user" ADD COLUMN     "city_state_id" VARCHAR(50);

-- CreateTable
CREATE TABLE "city_state" (
    "id" VARCHAR(50) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "uf" CHAR(2) NOT NULL,

    CONSTRAINT "pk_city" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_city" ON "city_state"("id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_city_uf" ON "city_state"("city", "uf");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_city_state_user" FOREIGN KEY ("city_state_id") REFERENCES "city_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
