module.exports = function (req, res, next) {
  //after req.user (from ./auth.js)
  // 403 Forbidden
  if (!req.user.isAdmin) return res.status(403).send("Access denied.Need Admin rights");
  next();
};

module.exports;
