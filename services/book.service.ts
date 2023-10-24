import prisma from "../prisma";

const getAllBooks = async (
  orderColumn: string,
  orderDirection: string,
  take: number,
  skip: number,
  available: string
) => {
  return await prisma.book.findMany({
    orderBy: {
      [orderColumn]: orderDirection,
    },
    where: available === "true" ? { Student: { none: {} } } : {},
    skip,
    take,
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

export default { getAllBooks, addNewBook, findBookById, deleteBook };
