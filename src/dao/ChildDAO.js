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
  async updateChildByshortId(shortId, payload) {
    const child = await Childs.findOneAndUpdate({ shortId }, payload, {
      new: true,
      lean: true,
    }).populate("location");
    return child;
  }
  async getChildbyShorId(shortId) {
    const child = await Childs.findOne(
      { shortId },
      {
        new: true,
        lean: true,
      }
    )
      .select({
        name: 1,
        authorized: 1,
        shortId: 1,
        customerId: 1,
      })
      .populate("location");
    return child;
  }
}

module.exports = ChildDAO;
