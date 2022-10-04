const { User } = require("../models");
const { verivyToken } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");
const key = process.env.JWT_TOKEN;

async function auth(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthorized" };
    let payload = jwt.verify(access_token, key);
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthorized" };

    req.user = {
      id: user.id,
    };
    next();
  } catch (err) {
    console.log(err);
    // next(err);
  }
}

module.exports = auth;
