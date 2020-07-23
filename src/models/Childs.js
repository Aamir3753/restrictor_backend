const mongoose = require("mongoose");

const shortId = require("shortid");

const Schema = mongoose.Schema;

const childSchema = new Schema({
  customerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  authorized: {
    type: Boolean,
    default: false,
  },
  shortId: {
    type: String,
    default: shortId,
  },
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Locations",
  },
});

const Childs = mongoose.model("Childs", childSchema, "Childs");
module.exports = Childs;
