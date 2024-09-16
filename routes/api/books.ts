import express from "../../index";
const router = express.Router();
import {
  getAllBooks,
  addNewBook,
  deleteBook,
  getSingleBook,
  rentBook,
  returnBook,
} from "../../controllers/books.controller";
import { Validators } from "../../utils/validatorDto";
import { customValidator } from "../../utils/helpers";
import verifyRoles from "../../middleware/verifyRoles";
import { Roles } from "../../utils/types";

router
  .route("/")
  // Get all books
  .get(getAllBooks)
  // Create new book
  .post(
    // verifyRoles([Roles.TEACHER, Roles.ADMIN]),
    customValidator(Validators.BODY, ["title"]),
    addNewBook
  )
  // Delete book
  .delete(
    verifyRoles([Roles.TEACHER, Roles.ADMIN]),
    customValidator(Validators.BODY, ["id"]),
    deleteBook
  );

router
  .route("/student/rent")
  // Rent book
  .patch(customValidator(Validators.BODY, ["studentId", "bookId"]), rentBook);

router
  .route("/student/return")
  // Return book
  .patch(customValidator(Validators.BODY, ["bookId", "studentId"]), returnBook);

router
  .route("/:id")
  // Get single book
  .get(
    verifyRoles([Roles.TEACHER, Roles.ADMIN]),
    customValidator(Validators.PARAMS, ["id"]),
    getSingleBook
  );

module.exports = router;
