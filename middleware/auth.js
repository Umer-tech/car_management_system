const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt-config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decoded = jwt.verify(token, jwtConfig.jwtSecret);
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
