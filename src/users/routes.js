const { Router } = require("express");
const userRouter = Router();

const { addUser, getUser } = require("./controllers");

// POST route to add a user to DB //
userRouter.post("/", addUser);

// GET route to read a user from DB by username //
userRouter.get("/", getUser);

module.exports = userRouter;
