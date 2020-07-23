const ChildService = require("../../services/ChildService");

const childService = new ChildService();

export const createChild = async (req, res, next) => {
  try {
    req.body.customerId = req.user.id;
    const child = await childService.createChild(req.body);
    res.json({ child });
  } catch (err) {
    next(err);
  }
};

export const getListOfChildsWithUserId = async (req, res, next) => {
  try {
    const childs = await childService.getListOfChildsByUserId(req.user.id);
    res.statusCode = 200;
    res.json({ childs });
  } catch (err) {
    next(err);
  }
};
