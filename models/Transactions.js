// models/transaction.js

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  borrowedDate: { type: Date, default: Date.now },
  dueDate: { type: Date },
  returnedDate: { type: Date },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
