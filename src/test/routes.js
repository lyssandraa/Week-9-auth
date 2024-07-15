const { Router } = require("express");
const testRouter = Router();

const {
  isData,
  isLowerCase,
  isValidEmail,
  isValidPassword,
} = require("../middleware/validation");
const { postTest } = require("./controllers");

testRouter.post(
  "/postTest",
  isData,
  isLowerCase,
  isValidEmail,
  isValidPassword,
  postTest
);

module.exports = testRouter;
