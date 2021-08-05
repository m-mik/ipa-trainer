/*
  Warnings:

  - You are about to drop the column `value` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the `Symbol` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,partOfSpeech]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('US', 'UK');

-- DropForeignKey
ALTER TABLE "Symbol" DROP CONSTRAINT "Symbol_wordId_fkey";

-- DropIndex
DROP INDEX "Word.value_partOfSpeech_unique";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "value",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Symbol";

-- CreateTable
CREATE TABLE "Pronunciation" (
    "id" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "symbols" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pronunciation.wordId_symbols_unique" ON "Pronunciation"("wordId", "symbols");

-- CreateIndex
CREATE UNIQUE INDEX "Word.name_partOfSpeech_unique" ON "Word"("name", "partOfSpeech");

-- AddForeignKey
ALTER TABLE "Pronunciation" ADD FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
