const { Router } = require("express");
const testRouter = Router();

const { postTest } = require("./controllers");

testRouter.post("/postTest", postTest);

module.exports = testRouter;
