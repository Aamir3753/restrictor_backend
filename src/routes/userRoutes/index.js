const Router = require("express").Router();
import { loginRequired } from "../../utils/authUtils";
Router.use("/auth", require("./userAtuhRoutes"));
Router.use("/childs", loginRequired, require("./childRoutes"));

module.exports = Router;
