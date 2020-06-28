const bcrypt = require("bcryptjs");

import { verifyRegularJWT, verifyRefreshJWT, throwError } from "./common";

export const getHashedPassword = (password) => {
  let saltRounds = 10;
  let hashPassword = bcrypt.hashSync(password, saltRounds);
  return hashPassword;
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const loginRequired = async (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "bearer"
    ) {
      let token = req.headers.authorization.split(" ")[1];
      let payload = await verifyRegularJWT(token);

      req.user = {
        ...payload,
      };
      return next();
    }
    throwError(400, "Authorization Header Not Present");
  } catch (e) {
    next(e);
  }
};

export const verifyRefreshToken = async (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "bearer"
    ) {
      let token = req.headers.authorization.split(" ")[1];
      let payload = await verifyRefreshJWT(token);
      req.user = {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        authToken: token,
      };
      return next();
    }
    throwError(400, "Authorization Header Not Present");
  } catch (e) {
    next(e);
  }
};
