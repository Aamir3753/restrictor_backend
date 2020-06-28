const UsersDAO = require("../dao/UserDAO");

const usersDAO = new UsersDAO();

import { comparePassword } from "../utils/authUtils";
import { generateRefreshJWT, generateRegularJWT } from "../utils/common";
class UserService {
  async createUser(payload) {
    let user = await usersDAO.createUser(payload);
    user = user.toObject();
    user.token = await generateRegularJWT(user._id, user.email);
    user.refreshToken = await generateRefreshJWT(user._id, user.email);
    return user;
  }

  async signIn(payload) {
    const attributes = {
      passwordHash: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
    };
    const user = await usersDAO.findUserByEmail(
      payload.email,
      true,
      attributes
    );
    if (!user) {
      const err = new Error("Incorrect email or password");
      err.statusCode = 401;
      throw err;
    }
    if (!comparePassword(payload.password, user.passwordHash)) {
      const err = new Error("Incorrect email or password");
      err.statusCode = 401;
      throw err;
    }
    user.token = await generateRegularJWT(user._id, user.email);
    user.refreshToken = await generateRefreshJWT(user._id, user.email);
    user.passwordHash = undefined;
    return user;
  }
}

module.exports = UserService;
