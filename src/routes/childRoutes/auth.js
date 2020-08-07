const Router = require("express").Router();
const {
  authenticateChild,
} = require("../../controllers/childControllers/auth");


Router.post("/authenticateChild", authenticateChild);
module.exports = Router;
