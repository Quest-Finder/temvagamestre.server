-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_player_profile_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "player_profile_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_player_profile_user" FOREIGN KEY ("player_profile_id") REFERENCES "player_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
