/*
  Warnings:

  - You are about to drop the column `user_id` on the `auth` table. All the data in the column will be lost.
  - You are about to drop the column `authId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "fk_user_auth";

-- DropIndex
DROP INDEX "auth_user_id_key";

-- DropIndex
DROP INDEX "uq_auth_id";

-- AlterTable
ALTER TABLE "auth" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "authId";
