-- CreateTable
CREATE TABLE "external_auth_mapping" (
    "user_id" VARCHAR(50) NOT NULL,
    "external_auth_user_id" VARCHAR(70) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_external_auth_mapping_user_id" ON "external_auth_mapping"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_external_auth_mapping_external_auth_user_id" ON "external_auth_mapping"("external_auth_user_id");

-- AddForeignKey
ALTER TABLE "external_auth_mapping" ADD CONSTRAINT "fk_user_external_auth_mapping" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
