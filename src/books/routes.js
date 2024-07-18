const { Router } = require("express");
const bookRouter = Router();

const { addBook, getBook } = require("./controllers");

bookRouter.post("/", addBook);

bookRouter.get("/:title", getBook);

// bookRouter.get("/getAllBooks");

module.exports = bookRouter;
