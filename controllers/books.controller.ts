import { Request, Response } from "express";
import bookService from "../services/book.service";
import studentService from "../services/student.service";

const getAllBooks = async (
  req: Request<{}, {}, {}, { isTaken: string }>,
  res: Response
) => {
  const books = await bookService.getAllBooks(
    req.query.isTaken
  );

  return res.status(201).json(books);
};

const addNewBook = async (
  { body: { title } }: Request,
  res: Response
) => {
  const newBook = await bookService.addNewBook(title);
  res.status(201).json(newBook);
};

const deleteBook = async (
  { body: { id } }: Request,
  res: Response
) => {
  const bookFounded = await bookService.findBookById(id);
  if (!bookFounded)
    return res
      .status(403)
      .json({ message: "There is no book mathes your id" });

  await bookService.deleteBook(id);

  return res.status(200).json({ message: "Book deleted" });
};

const getSingleBook = async (
  { params: { id } }: Request,
  res: Response
) => {
  const bookFounded = await bookService.findBookById(id);
  if (!bookFounded)
    return res
      .status(403)
      .json({ message: "There is no book mathes your id" });

  return res.status(201).json(bookFounded);
};

const rentBook = async (
  req: Request<
    {},
    {},
    { studentId: string; bookId: string }
  >,
  res: Response
) => {
  const foundStudent = await studentService.getStudentbyId(
    req.body.studentId
  );

  if (!foundStudent)
    return res
      .status(403)
      .json({ message: "No student matches your id" });

  const book = await bookService.rentBook(
    req.body.studentId,
    req.body.bookId
  );
  return res.status(201).json(book);
};

const returnBook = async (
  req: Request<
    {},
    {},
    { bookId: string; studentId: string }
  >,
  res: Response
) => {
  const returnedBook = await bookService.returnBook(
    req.body.bookId,
    req.body.studentId
  );

  return res.status(200).json(returnedBook);
};

export {
  getAllBooks,
  rentBook,
  addNewBook,
  deleteBook,
  getSingleBook,
  returnBook,
};
