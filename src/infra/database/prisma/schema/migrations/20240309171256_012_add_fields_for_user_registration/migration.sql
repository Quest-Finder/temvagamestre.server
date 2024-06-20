/*
  Warnings:

  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "last_name",
DROP COLUMN "nickname",
DROP COLUMN "phone",
ADD COLUMN     "pronoun" VARCHAR(10),
ADD COLUMN     "username" VARCHAR(25),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(30);
