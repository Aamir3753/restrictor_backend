const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  polygon: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [],
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
});
const Locations = mongoose.model("Locations", locationSchema, "Locations");
module.exports = Locations;
