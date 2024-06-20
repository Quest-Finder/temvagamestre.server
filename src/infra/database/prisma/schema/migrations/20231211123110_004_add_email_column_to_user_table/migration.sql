/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email" VARCHAR(256) NOT NULL,
ALTER COLUMN "address_id" DROP NOT NULL,
ALTER COLUMN "nickname" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_email" ON "user"("email");
