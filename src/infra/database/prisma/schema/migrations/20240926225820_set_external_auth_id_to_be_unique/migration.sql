/*
  Warnings:

  - A unique constraint covering the columns `[external_auth_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_external_auth_id_key" ON "user"("external_auth_id");
