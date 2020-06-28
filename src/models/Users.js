const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    min: 3,
    max: 20,
    required: true,
  },
  lastName: {
    type: String,
    min: 3,
    max: 20,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
});

const Users = mongoose.model("Users", userSchema, "Users");

module.exports = Users;
