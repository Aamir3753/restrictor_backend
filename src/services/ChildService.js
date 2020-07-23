const ChildDAO = require("../dao/ChildDAO");
const LocationDAO = require("../dao/LocationDAO");

const childDAO = new ChildDAO();
const locationDAO = new LocationDAO();

class ChildService {
  async createChild({ name, polygon, avatar, customerId }) {
    let location = await locationDAO.createLocation({ polygon });
    let child = await childDAO.createChild({
      name,
      location: location._id,
      avatar,
      customerId,
    });
    location = location.toObject();
    child = child.toObject();

    child.location = location;
    return location;
  }
  async getListOfChildsByUserId(userId) {
    const childs = await childDAO.getListOfChildsWithUserId(userId);
    return childs;
  }
}

module.exports = ChildService;
