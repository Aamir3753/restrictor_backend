const ChildDAO = require("../dao/ChildDAO");
const LocationDAO = require("../dao/LocationDAO");
import * as events from "./events";
const childDAO = new ChildDAO();
const locationDAO = new LocationDAO();
class ChildCallbacks {
  constructor(socket) {
    this.socket = socket;
    this.updateChildLocation = this.updateChildLocation.bind(this);
    socket.on(events.LOCATION_RECEIVED, this.updateChildLocation);
  }
  async updateChildLocation(location) {
    console.log("testing location", location);
    try {
      let child = await childDAO.getChildbyShorId(location.shortId);
      await locationDAO.findLocationByIdAndUpdate(child.location._id, {
        currentLocation: {
          coordinates: [location.longitude, location.latitude],
        },
      });
      child = await childDAO.getChildbyShorId(location.shortId);
      this.socket.broadcast.emit(location.shortId, child);
      console.log("event emited");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ChildCallbacks;
