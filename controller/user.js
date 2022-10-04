const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class userController {
  static async register(req, res, next) {
    let body = {
      email: req.body.email,
      password: req.body.password,
      role: "admin",
      phoneNumber: req.body.phoneNumber,
      Address: req.body.address,
    };
    try {
      const createdUser = await User.create(body);
      res.status(201).json({
        message: `User with email ${createdUser.email} has been created`,
      });
    } catch (err) {
      console.log(err);
      //   next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "invalid email/password" };
      }
      const passwordValidation = comparePassword(password, user.password);
      if (!passwordValidation) {
        throw { name: "invalid email/password" };
      }
      const payload = {
        id: user.id,
        role: user.role,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      //   next(err);
    }
  }
}

module.exports = userController;
