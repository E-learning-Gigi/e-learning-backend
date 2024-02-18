import { Request, Response } from "express";
import studentService from "../services/student.service";

const getAllStudents = async (
  req: Request,
  res: Response
) => {
  const allStudents = await studentService.getAllStudents();

  return res.status(201).json(allStudents);
};

const addNewStudent = async (
  { body: { name, email } }: Request,
  res: Response
) => {
  try {
    const newStudent =
      await studentService.createNewStudent({
        name,
        email,
      });
    res.status(201).json(newStudent);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Name or Email are already in use",
      });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (
  { body: { id } }: Request,
  res: Response
) => {
  const result = await studentService.deleteStudent(id);

  return res.status(201).json(result);
};

const getSingleStudent = async (
  { params: { id } }: Request,
  res: Response
) => {
  const foundStudent = await studentService.getStudentbyId(
    id
  );

  return res.status(203).json(foundStudent);
};

const updateStudent = async (
  { params: { id }, body: { name, email } }: Request,
  res: Response
) => {
  const updatedStudent = await studentService.updateStudent(
    { id, name, email }
  );

  return res.status(201).json(updatedStudent);
};

export {
  getAllStudents,
  addNewStudent,
  deleteStudent,
  getSingleStudent,
  updateStudent,
};
