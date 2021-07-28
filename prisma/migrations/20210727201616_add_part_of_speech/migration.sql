/*
  Warnings:

  - You are about to drop the column `ukPronunciation` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `usPronunciation` on the `Word` table. All the data in the column will be lost.
  - Added the required column `partOfSpeech` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ukIpa` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usIpa` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PartOfSpeech" AS ENUM ('NOUN', 'VERB', 'ADJECTIVE');

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "ukPronunciation",
DROP COLUMN "usPronunciation",
ADD COLUMN     "partOfSpeech" "PartOfSpeech" NOT NULL,
ADD COLUMN     "ukIpa" TEXT NOT NULL,
ADD COLUMN     "usIpa" TEXT NOT NULL;
