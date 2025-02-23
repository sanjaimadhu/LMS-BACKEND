const Book = require("../models/Books");
const Transaction = require("../models/Transactions");
const cloudinary = require("cloudinary").v2;
const uploadFileToCloudinary = require("../utils/uploadOnCloud");

exports.getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ availability: true });
    res.status(200).json({
      success: true,
      message: "List of available books",
      data: books,
    });
  } catch (err) {
    console.log("Error in getAvailableBooks: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: true,
      message: "List of available books",
      data: books,
    });
  } catch (err) {
    console.log("Error in getAvailableBooks: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getBorrowersOfBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Transaction.find({ book: bookId }).populate("user");
    res.status(200).json({
      success: true,
      message: "List of borrowers of the book",
      data: book,
    });
  } catch (err) {
    console.log("Error in getBorrowersOfBook: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, isbn, description, copies } = req.body;
    const { bookImage } = req.files;

    if (
      !title ||
      !author ||
      !copies ||
      !genre ||
      !isbn ||
      !description ||
      !bookImage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    //chech if book already exists
    const bookExists = await Book.findOne({ isbn: isbn });
    if (bookExists) {
      return res.status(400).json({
        success: false,
        message: "Book already exists",
      });
    }

    let bookImageURL = await uploadFileToCloudinary(
      bookImage,
      process.env.CLOUDINARY_FOLDER_NAME
    );
    if (!bookImageURL) {
      return res.status(500).json({
        success: false,
        message: "Error in uploading image to cloudinary",
      });
    }

    bookImageURL = bookImageURL.secure_url;

    const book = await Book.create({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      bookImage: bookImageURL,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (err) {
    console.log("Error in addBook: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getIssuedBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "Please provide user id" });
    const books = await Transaction.find({ userId: userId }).populate("book");
    return res.status(200).json({
      success: true,
      message: "List of issued books",
      data: books,
    });
  } catch (err) {
    console.log("Error in getIssuedBooks: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
