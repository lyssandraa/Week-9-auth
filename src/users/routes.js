const { Router } = require("express");
const userRouter = Router();

const {
  signUp,
  logIn,
  getUser,
  getAllUsers,
  updateInfo,
} = require("./controllers");

const { hashPass, comparePass, verifyToken } = require("../middleware/auth");
const { compare } = require("bcrypt");

// POST route to add a user to DB //
userRouter.post("/", hashPass, signUp);

// POST route to log in //
userRouter.post("/logIn", comparePass, logIn);

// GET route to read all users from DB //
userRouter.get("/getAllUsers", verifyToken, getAllUsers);

// GET route to read a user from DB by username //
userRouter.get("/:username", getUser);

//PUT route to dynamically update user login info //
userRouter.put("/", updateInfo);

module.exports = userRouter;
