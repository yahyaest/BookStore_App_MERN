const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App",
    message: "Bookstore Api",
    usersUrl: `/api/users`,
    booksUrl: `/api/books`,
    profilesUrl: `/api/profiles`,
    commentsUrl: `/api/comments`,
    ordersUrl: `/api/orders`,
    authUrl: `/api/auth`,
  });
});

module.exports = router;
