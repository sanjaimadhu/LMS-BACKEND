const express = require("express");

const router = express.Router();

//importing the controller
const {
  getAvailableBooks,
  getBorrowersOfBook,
  addBook,
  getBooks,
  getIssuedBooks,
} = require("../controllers/Books");

//auth
const { auth, isBorrower, isLibrarian } = require("../middleware/auth");

router.get("/getAvailableBooks", getAvailableBooks);
router.get("/get=:bookId", auth, isLibrarian, getBorrowersOfBook);
router.get("/getBooks", getBooks);
router.post("/addBook", auth, isLibrarian, addBook);
router.get("/getIssuedBooks/get=:userId", auth, isBorrower, getIssuedBooks);

module.exports = router;
