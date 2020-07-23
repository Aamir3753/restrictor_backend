const Router = require("express").Router();
import {
  createChild,
  getListOfChildsWithUserId,
} from "../../controllers/userControllers/childController";
Router.post("/createChild", createChild);
Router.get("/getListOfChilds", getListOfChildsWithUserId);

module.exports = Router;
