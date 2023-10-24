import express from "../../index";
const router = express.Router();
import {
  getAllStudents,
  updateStudentBook,
  addNewStudent,
  getSingleStudent,
  removeBookFromStudent,
  deleteStudent,
  updateStudent,
} from "../../controllers/students.controller";
import { customValidator } from "../../utils/helpers";
import { Validators } from "../../utils/validatorDto";
import verifyRoles from "../../middleware/verifyRoles";
import { Roles } from "../../utils/types";

router
  .route("/")
  .get(verifyRoles([Roles.ADMIN, Roles.TEACHER]), getAllStudents)
  .patch(
    customValidator(Validators.BODY, ["studentId", "bookId"]),
    updateStudentBook
  )
  .post(
    verifyRoles([Roles.ADMIN, Roles.TEACHER]),
    customValidator(Validators.BODY, ["name", "email"]),
    addNewStudent
  )
  .delete(
    verifyRoles([Roles.ADMIN, Roles.TEACHER]),
    customValidator(Validators.BODY, ["id"]),
    deleteStudent
  );

router
  .route("/:id")
  .get(customValidator(Validators.PARAMS, ["id"]), getSingleStudent)
  .patch(
    verifyRoles([Roles.ADMIN, Roles.TEACHER]),
    customValidator(Validators.PARAMS, ["id"]),
    removeBookFromStudent
  );

router
  .route("/update/:id")
  .patch(
    customValidator(Validators.PARAMS, ["id"]),
    customValidator(Validators.BODY, ["name", "email"]),
    updateStudent
  );

module.exports = router;
