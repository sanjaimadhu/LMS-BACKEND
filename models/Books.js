// models/book.js

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  isbn: { type: String },
  description: { type: String },
  copies: { type: Number, required: true },
  issued: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  bookImage: { type: String, required: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
