import { Request, Response, NextFunction } from "express";
import studentService from "../services/student.service";

const userExistsById = async (
  req: Request<{ id: string }, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  const student = await studentService.getStudentbyId(
    req.body.id || req.params.id
  );

  if (!student)
    return res.status(403).json({
      message: "There is no student mathes your id",
    });

  next();
};

export default userExistsById;
