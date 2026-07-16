/*
  Warnings:

  - You are about to drop the column `exp` on the `refresh_tokens` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "refresh_tokens_exp_idx";

-- AlterTable
ALTER TABLE "refresh_tokens"
RENAME COLUMN "exp" TO "expires_at";

-- CreateIndex
CREATE INDEX "refresh_tokens_expires_at_idx" ON "refresh_tokens"("expires_at");
