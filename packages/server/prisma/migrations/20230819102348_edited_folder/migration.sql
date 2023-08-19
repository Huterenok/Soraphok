/*
  Warnings:

  - You are about to drop the column `decription` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the `_favoriteArticles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_favoriteFolders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_favoriteArticles" DROP CONSTRAINT "_favoriteArticles_A_fkey";

-- DropForeignKey
ALTER TABLE "_favoriteArticles" DROP CONSTRAINT "_favoriteArticles_B_fkey";

-- DropForeignKey
ALTER TABLE "_favoriteFolders" DROP CONSTRAINT "_favoriteFolders_A_fkey";

-- DropForeignKey
ALTER TABLE "_favoriteFolders" DROP CONSTRAINT "_favoriteFolders_B_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_authorId_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_folderId_fkey";

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "decription",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "_favoriteArticles";

-- DropTable
DROP TABLE "_favoriteFolders";

-- CreateTable
CREATE TABLE "_favouriteArticles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_favouriteFolders" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favouriteArticles_AB_unique" ON "_favouriteArticles"("A", "B");

-- CreateIndex
CREATE INDEX "_favouriteArticles_B_index" ON "_favouriteArticles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_favouriteFolders_AB_unique" ON "_favouriteFolders"("A", "B");

-- CreateIndex
CREATE INDEX "_favouriteFolders_B_index" ON "_favouriteFolders"("B");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouriteArticles" ADD CONSTRAINT "_favouriteArticles_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouriteArticles" ADD CONSTRAINT "_favouriteArticles_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouriteFolders" ADD CONSTRAINT "_favouriteFolders_A_fkey" FOREIGN KEY ("A") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favouriteFolders" ADD CONSTRAINT "_favouriteFolders_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
