const Locations = require("../models/Locations");

class LocationsDAO {
  async createLocation(payload) {
    const location = await Locations.create(payload);
    return location;
  }
  async findLocationByIdAndUpdate(locationId, attributes) {
    const location = await Locations.findByIdAndUpdate(locationId, attributes, {
      lean: true,
      new: true,
    });
    return location;
  }
}
module.exports = LocationsDAO;
