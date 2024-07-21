const { Router } = require("express");
const bookRouter = Router();

const { addBook, getBooksByUser } = require("./controllers");

bookRouter.post("/", addBook);

bookRouter.get("/:userId", getBooksByUser);

module.exports = bookRouter;
