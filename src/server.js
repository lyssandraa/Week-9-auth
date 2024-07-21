require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5001;

const User = require("./users/model");
const Book = require("./books/model");

const testRouter = require("./test/routes");
const userRouter = require("./users/routes");
const bookRouter = require("./books/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/test", testRouter);
app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

const syncTables = async () => {
  User.hasMany(Book, { foreignKey: "userId" });
  Book.belongsTo(User, { foreignKey: "userId" });

  await User.sync({ alter: true });
  await Book.sync({ alter: true });
};

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});
