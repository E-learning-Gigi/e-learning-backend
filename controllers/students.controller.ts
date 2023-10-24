import { Request, Response } from "express";
import studentService from "../services/student.service";
import { StudentFindersKey } from "../utils/studentDto";
import { PaginationQuery } from "../utils/types";

const getAllStudents = async (
  { query }: { query: PaginationQuery },
  res: Response
) => {
  const {
    orderBy = "name",
    orderDirection = "asc",
    take = 4,
    skip = 0,
  } = query;
  const allStudents = await studentService.getAllStudents(
    orderBy,
    orderDirection,
    +take,
    +skip
  );
  if (!allStudents)
    return res.status(204).json({ message: "No students in db" });
  return res.status(201).json(allStudents);
};

const updateStudentBook = async (
  { body: { studentId, bookId } }: Request,
  res: Response
) => {
  const foundStudent = await studentService.getStudentby(
    StudentFindersKey.ID,
    studentId
  );

  if (!foundStudent)
    return res.status(403).json({ message: "No student matches your id" });
  const updatedStudent = await studentService.updateStudentBook(
    studentId,
    bookId
  );

  return res.status(201).json(updatedStudent);
};

const addNewStudent = async (
  { body: { name, email } }: Request,
  res: Response
) => {
  try {
    const newStudent = await studentService.createNewStudent({ name, email });
    res.status(201).json(newStudent);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Name or Email are already in use" });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async ({ body: { id } }: Request, res: Response) => {
  const result = await studentService.deleteStudent(id);
  if (!result)
    return res.status(403).json({ message: "No student with provided ID" });

  return res.status(201).json(result);
};

const getSingleStudent = async ({ params: { id } }: Request, res: Response) => {
  const foundStudent = await studentService.getStudentWithBookBy(
    StudentFindersKey.ID,
    id
  );
  if (!foundStudent)
    return res
      .status(403)
      .json({ message: "There is no student mathes your id" });

  return res.status(203).json(foundStudent);
};

const removeBookFromStudent = async (
  { params: { id } }: Request,
  res: Response
) => {
  const updatedStudent = await studentService.updateStudentBook(id, null);
  if (!updatedStudent) return res.json({ message: "No student" });
  return res.status(204).json(updatedStudent);
};

const updateStudent = async (
  { params: { id }, body: { name, email } }: Request,
  res: Response
) => {
  const foundStudent = await studentService.getStudentby(
    StudentFindersKey.ID,
    id
  );
  if (!foundStudent) return res.json({ message: "No student found" });

  const updatedStudent = await studentService.updateStudent({
    id,
    name,
    email,
  });

  return res.status(201).json(updatedStudent);
};

export {
  getAllStudents,
  updateStudentBook,
  addNewStudent,
  deleteStudent,
  getSingleStudent,
  removeBookFromStudent,
  updateStudent,
};
