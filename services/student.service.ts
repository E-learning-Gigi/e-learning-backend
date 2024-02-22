import prisma from "../prisma";
import { CreateStudent } from "../utils/studentDto";

const getAllStudents = async () => {
  return prisma.student.findMany();
};

const getStudentbyId = async (id: string) => {
  return await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
};

const createNewStudent = async ({
  name,
  email,
}: CreateStudent) => {
  return await prisma.student.create({
    data: {
      name,
      email,
    },
  });
};

const deleteStudent = async (id: string) => {
  return await prisma.student.delete({
    where: {
      id: id,
    },
  });
};

const updateStudent = async ({ id, name, email }: any) => {
  return await prisma.student.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
    },
  });
};

export default {
  getAllStudents,
  getStudentbyId,
  createNewStudent,
  deleteStudent,
  updateStudent,
};
