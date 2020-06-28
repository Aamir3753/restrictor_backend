import { checkSchema } from "express-validator";

export const validateSignUp = checkSchema({
  firstName: {
    in: ["body"],
    isString: true,
    errorMessage: "Firstname is invalid",
    matches: /^[a-z0-9 ]+$/i,
    isLength: {
      errorMessage:
        "Firstname must be greater than 4  and less than 20 letters",
      options: { min: 3, max: 20 },
    },
  },
  lastName: {
    in: ["body"],
    isString: true,
    errorMessage: "Lastname is invalid",
    matches: /^[a-z0-9 ]+$/i,
    isLength: {
      errorMessage: "Lastname must be greater than 4  and less than 20 letters",
      options: { min: 3, max: 20 },
    },
  },
  email: {
    in: ["body"],
    isEmail: true,
    errorMessage: "Please provide a valild email address",
  },
  password: {
    in: ["body"],
    isString: true,
    errorMessage: "Password should be alphanumaric",
    isLength: {
      errorMessage: "Password must be greater than 7 characters",
      options: { min: 7 },
    },
  },
});

export const validateSignIn = checkSchema({
  email: {
    in: ["body"],
    isEmail: true,
    errorMessage: "Please provide a valild email address",
  },
  password: {
    in: ["body"],
    isString: true,
    errorMessage: "Password is required",
  },
});
