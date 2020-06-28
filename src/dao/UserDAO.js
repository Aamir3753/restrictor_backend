const Users = require("../models/Users");
import { getHashedPassword } from "../utils/authUtils";

class UsersDAO {
    async createUser(payload) {
        payload.passwordHash = await getHashedPassword(payload.password);
        const user = await Users.create(payload);
        return user;
    }
    async updateUserById(id, attributes) {
        const user = await Users.findByIdAndUpdate(id, attributes, {
            new: true,
            lean: true,
        });
        return user;
    }
    async findUserById(id, lean) {
        const user = await Users.findById(id).lean(lean);
        return user;
    }
    async findUserByEmailAndUpdate(email, payload) {
        return await Users.findOneAndUpdate({ email }, {...payload }, { new: true })
    }

    async findUserByEmail(email, lean, attributes) {
        const user = await Users.findOne({ email }).lean(lean).select(attributes);
        return user;
    }
    async updatePassword(id, password) {
        let passwordHash = getHashedPassword(password);
        let customer = await Users.findOneAndUpdate({ _id: id }, { passwordHash: passwordHash }, { new: true }).lean();
        if (!customer) throwError(404, "Customer does not exist");
        return customer;
    }
}

module.exports = UsersDAO;