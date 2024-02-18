import prisma from "../prisma";
import { stringToBool } from "../utils/helpers";

const getAllBooks = async (isTaken: string) => {
  const queryToBoolean = stringToBool(isTaken);

  return await prisma.book.findMany({
    where: {
      ...(queryToBoolean
        ? { isTaken: queryToBoolean }
        : {}),
    },
    include: { student: true },
  });
};

const addNewBook = async (title: string) => {
  return prisma.book.create({
    data: {
      title: title,
    },
  });
};

const findBookById = async (id: string) => {
  return await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
};

const deleteBook = async (id: string) => {
  return await prisma.book.delete({
    where: {
      id: id,
    },
  });
};

const rentBook = async (
  studentId: string,
  bookId: string
) => {
  return await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      studentId,
      isTaken: true,
    },
  });
};

const returnBook = async (
  bookId: string,
  studentId: string
) => {
  return await prisma.book.update({
    where: {
      id: bookId,
      studentId,
    },
    data: { studentId: null, isTaken: false },
  });
};

export default {
  getAllBooks,
  addNewBook,
  findBookById,
  rentBook,
  deleteBook,
  returnBook,
};
