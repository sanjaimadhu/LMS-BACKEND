const express = require("express");

const router = express.Router();

//importing the controller
const {
  borrowBook,
  returnBook,
  getTransactions,
} = require("../controllers/Transactions");

const { auth, isLibrarian, isBorrower } = require("../middleware/auth");

router.get("/getTransactions/get=:userId", auth, isBorrower, getTransactions);
router.post("/borrow", auth, isBorrower, borrowBook);
router.post("/return", auth, isBorrower, returnBook);

module.exports = router;
