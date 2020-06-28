const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  privateKey,
  publicKey,
  regularPrivateKey,
  regularPublicKey,
} = require("../../authkey");
const roles = {
  CUSTOMER: "USER",
};
// common functions
export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const getObjectId = (str) => {
  return mongoose.Types.ObjectId(str);
};
export const generateRegularJWT = (id, email, role) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: id,
        email: email,
        role: role ? role : roles.CUSTOMER,
      },
      regularPrivateKey,
      { expiresIn: "2h", algorithm: "RS256" },
      function (err, token) {
        console.log(err);
        if (err) reject(new Error("Token Creation Failed"));
        resolve(token);
      }
    );
  });
};

export const generateRefreshJWT = (id, email, role) => {
  let options = { expiresIn: "180 days", algorithm: "RS512" };
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: id,
        email: email,
        role: role ? role : roles.CUSTOMER,
      },
      privateKey,
      options,
      function (err, token) {
        if (err) reject(returnError("Token Creation Failed"));
        resolve(token);
      }
    );
  });
};

export const verifyRegularJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      regularPublicKey,
      { algorithms: ["RS256"] },
      (err, decode) => {
        if (err) {
          if (err.name == "TokenExpiredError")
            reject(returnError(401, "Token Expired"));
          if (err.name == "JsonWebTokenError") {
            console.log(err);
            reject(returnError(400, "Token Malformed"));
          }
          if (err.name == "NotBeforeError")
            reject(returnError(400, "Token Inactive"));
        }
        resolve(decode);
      }
    );
  });
};

export const verifyRefreshJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, { algorithms: ["RS512"] }, (err, decode) => {
      if (err) {
        if (err.name == "TokenExpiredError")
          reject(returnError(401, "Token Expired"));
        if (err.name == "JsonWebTokenError")
          reject(returnError(400, "Token Malformed"));
        if (err.name == "NotBeforeError")
          reject(returnError(400, "Token Inactive"));
      }
      resolve(decode);
    });
  });
};

export const generatePasswordResetJWT = (id, email, userName, role) => {
  let options = { expiresIn: "2h", algorithm: "RS256" };
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: id,
        email: email,
        userName: userName,
        role: role ? role : roles.CUSTOMER,
      },
      regularPrivateKey,
      options,
      function (err, token) {
        console.log(err);
        if (err) reject(new Error("Token Creation Failed"));
        resolve(token);
      }
    );
  });
};

export const throwError = (statusCode, errorMessage) => {
  let error = new Error(errorMessage);
  error.status = statusCode ? statusCode : 400;
  throw error;
};

export const returnError = (statusCode, errorMessage) => {
  let error = new Error(errorMessage);
  error.status = statusCode ? statusCode : 400;
  return error;
};
