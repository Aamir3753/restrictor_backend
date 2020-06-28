const Router = require("express").Router();

Router.use("/auth", require("./userAtuhRoutes"));

module.exports = Router;
