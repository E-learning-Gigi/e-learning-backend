-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_studentId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
