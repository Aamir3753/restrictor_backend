const Childs = require("../models/Childs");

class ChildDAO {
  async createChild(payload) {
    const child = await Childs.create(payload);
    return child;
  }
  async getListOfChildsWithUserId(customerId) {
    const childs = await Childs.find({ customerId })
      .populate("location")
      .lean()
      .sort({ _id: -1 })
      .exec();
    return childs;
  }
}

module.exports = ChildDAO;
