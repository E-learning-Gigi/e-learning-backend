import express from "../../index";
const router = express.Router();
import {
  getAllStudents,
  addNewStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
} from "../../controllers/students.controller";
import { customValidator } from "../../utils/helpers";
import { Validators } from "../../utils/validatorDto";
import verifyRoles from "../../middleware/verifyRoles";
import { Roles } from "../../utils/types";
import userExistsById from "../../pipes/userExistsByIdPipe";

router
  .route("/")
  // Get all students
  .get(
    verifyRoles([Roles.ADMIN, Roles.TEACHER]),
    getAllStudents
  )
  // Create new student
  .post(
    verifyRoles([Roles.ADMIN, Roles.TEACHER]),
    customValidator(Validators.BODY, ["name", "email"]),
    addNewStudent
  )
  // Delete student
  .delete(
    verifyRoles([Roles.ADMIN]),
    customValidator(Validators.BODY, ["id"]),
    userExistsById,
    deleteStudent
  );

router
  .route("/:id")
  // Get single
  .get(
    customValidator(Validators.PARAMS, ["id"]),
    userExistsById,
    getSingleStudent
  )
  // Update single
  .patch(
    customValidator(Validators.PARAMS, ["id"]),
    customValidator(Validators.BODY, ["name", "email"]),
    userExistsById,
    updateStudent
  );

module.exports = router;
