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
  async authenticateChildByShortId(shortId) {
    const child = await childDAO.updateChildByshortId(shortId, {
      authorized: true,
    });

    if (!child) {
      const err = new Error("Invalid ShortId");
      err.statusCode = 404;
      throw err;
    }
    return child;
  }
  async getChildByShortId(shortId) {
    const child = await childDAO.getChildbyShorId(shortId);
    if (!child) {
      const err = new Error("Child Not Found");
      err.statusCode = 404;
      throw err;
    }
    return child;
  }
}

module.exports = ChildService;
