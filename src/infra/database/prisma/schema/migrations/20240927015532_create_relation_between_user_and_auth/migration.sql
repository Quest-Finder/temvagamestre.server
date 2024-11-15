/*
  Warnings:

  - You are about to drop the column `auth_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "auth_id",
ADD COLUMN     "authId" VARCHAR(36) NOT NULL,
ADD COLUMN     "email" VARCHAR(256) NOT NULL;

-- CreateTable
CREATE TABLE "auth" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "onboarding" BOOLEAN NOT NULL DEFAULT true,
    "refresh_token" VARCHAR(255),
    "user_id" VARCHAR(50),

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_auth_email" ON "auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_id_key" ON "auth"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_auth_id" ON "user"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "uq_user_email" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_user_auth" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
