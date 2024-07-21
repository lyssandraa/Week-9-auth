const Book = require("./model");

const addBook = async (req, res) => {
  try {
    const book = Book.create(req.body);
    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getBooksByUser = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { userId: req.params.userId } });
    res.status(200).json({ message: "success", books: books });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

module.exports = {
  addBook,
  getBooksByUser,
};
