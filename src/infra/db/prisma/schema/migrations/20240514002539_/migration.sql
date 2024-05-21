/*
  Warnings:

  - Added the required column `life_in_brazil` to the `city_state` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "city_state" ADD COLUMN     "life_in_brazil" BOOLEAN NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "uf" DROP NOT NULL;
