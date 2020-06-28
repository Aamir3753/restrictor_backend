const Router = require("express").Router();

Router.use("/api/v1/users", require("./userRoutes"));

module.exports = Router;
