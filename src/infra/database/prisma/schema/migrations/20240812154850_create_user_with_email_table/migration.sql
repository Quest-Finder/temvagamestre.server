CREATE TABLE "user_with_email" (
    "id" VARCHAR(50) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "pk_user_with_email" PRIMARY KEY ("id")
);