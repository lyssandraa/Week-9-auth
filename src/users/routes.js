const { Router } = require("express");
const userRouter = Router();

const {
  signUp,
  logIn,
  getUser,
  getAllUsers,
  updateInfo,
} = require("./controllers");

// POST route to add a user to DB //
userRouter.post("/", signUp);

//
userRouter.get("/logIn", logIn);

// GET route to read a user from DB by username //
userRouter.get("/:username", getUser);

// GET route to read all users from DB //
userRouter.get("/getAllUsers", getAllUsers);

//PUT route to dynamically update user login info //
userRouter.put("/", updateInfo);

module.exports = userRouter;
