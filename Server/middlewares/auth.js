const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // 401 Unauthorized
  const token = req.header("x-auth-token");
  console.log("token", req.header("x-auth-token"));
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtPrivateKey")
      // process.env.bookstore_jwtPrivateKey
    );
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports;
