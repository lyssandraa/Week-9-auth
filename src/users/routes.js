const { Router } = require("express");
const userRouter = Router();

const { signUp, getUser, getAllUsers } = require("./controllers");

// POST route to add a user to DB //
userRouter.post("/", signUp);

// GET route to read a user from DB by username //
userRouter.get("/", getUser);

// GET route to read all users from DB //
userRouter.get("/getAllUsers", getAllUsers);

module.exports = userRouter;
