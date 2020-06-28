const UserService = require("../../services/UserService");
const userService = new UserService();

export const signUp = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.statusCode = 200;
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.signIn({ email, password });
    res.statusCode = 200;
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
