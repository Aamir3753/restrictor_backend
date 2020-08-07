const Router = require("express").Router();

Router.use("/childs", require("./auth"));

module.exports = Router;
