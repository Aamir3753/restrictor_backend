const Router = require("express").Router();
import { validationResult } from "express-validator";
import {
  validateSignUp,
  validateSignIn,
} from "../../validators/userAuthValidator";
import {
  signUp,
  signIn,
} from "../../controllers/userControllers/authControllers";

Router.post(
  "/signUp",
  validateSignUp,
  (req, res, next) => {
    const errorList = validationResult(req);
    if (errorList.isEmpty()) {
      next();
      return;
    }
    const msg = errorList.errors[0].msg;
    const err = new Error(msg);
    next(err);
  },
  signUp
);

Router.post(
  "/signIn",
  validateSignIn,
  (req, res, next) => {
    const errorList = validationResult(req);
    if (errorList.isEmpty()) {
      next();
      return;
    }
    const msg = errorList.errors[0].msg;
    const err = new Error(msg);
    next(err);
  },
  signIn
);

module.exports = Router;
