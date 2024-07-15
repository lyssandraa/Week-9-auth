const { Router } = require("express");
const testRouter = Router();

const { isData } = require("../middleware/validation");
const { postTest } = require("./controllers");

testRouter.post("/postTest", isData, postTest);

module.exports = testRouter;
