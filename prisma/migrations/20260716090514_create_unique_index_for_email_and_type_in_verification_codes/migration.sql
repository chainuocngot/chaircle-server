/*
  Warnings:

  - A unique constraint covering the columns `[email,type]` on the table `verification_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "verification_codes_email_type_idx";

-- CreateIndex
CREATE UNIQUE INDEX "verification_codes_email_type_key" ON "verification_codes"("email", "type");
