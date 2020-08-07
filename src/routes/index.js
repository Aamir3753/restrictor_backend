const Router = require("express").Router();

Router.use("/api/v1/users", require("./userRoutes"));
Router.use("/api/v1", require("./childRoutes"));

module.exports = Router;
