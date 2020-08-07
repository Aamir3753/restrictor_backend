const ChildService = require("../../services/ChildService");

const childService = new ChildService();

export const authenticateChild = async (req, res, next) => {
  try {
    const { shortId } = req.body;
    const child = await childService.authenticateChildByShortId(shortId);
    res.statusCode = 200;
    res.json({ child });
  } catch (err) {
    next(err);
  }
};
