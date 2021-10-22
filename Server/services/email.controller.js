const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const sendEmail = require("./email.send");
const msgs = require("./email.msgs");
const templates = require("./email.templates");

// The callback that is invoked when the user submits the form on the client.
exports.collectEmail = (req, res) => {
  let { username, password, email} = req.body;

  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email })
    .then(async (user) => {
      // We have a new user! Send them a confirmation email.

      if (!user) {
        // Password hashing //
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        // Create new user //
        User.create({ username, password, email  })
          .then((newUser) =>
            sendEmail(newUser.email, templates.confirm(newUser._id))
          )
          .then(() => res.json({ msg: msgs.confirm }))
          .catch((err) => console.log(err));
      }

      // We have already seen this email address. But the user has not
      // clicked on the confirmation link. Send another confirmation email.
      else if (user && !user.confirmed) {
        sendEmail(user.email, templates.confirm(user._id)).then(() =>
          res.json({ msg: msgs.resend })
        );
      }

      // The user has already confirmed this email address
      else {
        res.json({ msg: msgs.alreadyConfirmed });
      }
    })
    .catch((err) => console.log(err));
};

// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      // A user with that id does not exist in the DB. Perhaps some tricky
      // user tried to go to a different url than the one provided in the
      // confirmation email.
      if (!user) {
        res.json({ msg: msgs.couldNotFind });
      }

      // The user exists but has not been confirmed. We need to confirm this
      // user and let them know their email address has been confirmed.
      else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: msgs.confirmed }))
          .catch((err) => console.log(err));
      }

      // The user has already confirmed this email address.
      else {
        res.json({ msg: msgs.alreadyConfirmed });
      }
    })
    .catch((err) => console.log(err));
};

// The callback that is invoked when the user submit the password reset form.
exports.forgetPassword = (req, res) => {
  let { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        //res.json({ msg: msgs.couldNotFind });
        return res.status(404).send({ msg: msgs.couldNotFind });
      } else {
        sendEmail(user.email, templates.reset(user._id)).then(() =>
          res.json({ msg: msgs.reset })
        );
      }
    })
    .catch((err) => console.log(err));
};

// The callback that is invoked when the user visits the password reset
// url on the client and a fetch request is sent in componentDidMount.
exports.resetPssword = (req, res) => {
  const { id } = req.params;
  let { password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send({ msg: "Invalid ID." });

  User.findById(id)
    .then(async (user) => {
      if (!user) {
        // res.json({ msg: msgs.couldNotFind });
        return res.status(404).send({ msg: msgs.couldNotFind });
      } else {
        // Password hashing //
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        // Password update //
        User.findByIdAndUpdate(id, { password })
          .then(() => res.json({ msg: msgs.passwordReseted }))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};
