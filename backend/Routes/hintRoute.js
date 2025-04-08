const express = require("express");
const hintCtrl = require("../controllers/hintCtrl");
const hintRouter = express.Router();
hintRouter.post("/cc-club/create/hint", hintCtrl.create);
hintRouter.get("/cc-club/hint/:code", hintCtrl.getHint);
module.exports = hintRouter;