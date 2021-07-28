/*
  Warnings:

  - A unique constraint covering the columns `[word,partOfSpeech]` on the table `WordInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WordInfo.word_partOfSpeech_unique" ON "WordInfo"("word", "partOfSpeech");
