const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const activationMailer = require("../../middleware/mailer");
const recoveryMailer = require("../../middleware/reMailer");
const { check, validationResult } = require("express-validator/check");

const validateLoginImput = require("../../validation/login");

const User = require("../../models/User");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a stronger password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User exist" }] });
      }
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const salty = await bcrypt.genSalt(10);
      const secret_key = await bcrypt.hash(email, salty);
      const confirmed = false;
      const salt = await bcrypt.genSalt(10);
      const confirmedKey = false;

      user = new User({
        name,
        email,
        avatar,
        password,
        confirmed,
        confirmedKey,
        role,
      });

      const resEmail = activationMailer(user, secret_key);
      var finChecker = await resEmail.then((value) => {
        return value;
      });

      user.confirmedKey = await bcrypt.hash(user.id, secret_key);
      user.password = await bcrypt.hash(password, salt);

      if (finChecker == true) {
        await user.save();
        return res.redirect("/login");
      }
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

// @route   Users api/users/login
// @desc    POST Login form
// @access  Private

router.post("/login", (req, res) => {
  const { errors } = validateLoginImput(req.body);
  const email = req.body.email;
  const password = req.body.passowrd;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    const { confirmed } = User;
    bcrypt.compare(password, user.passowrd).then((isMatch) => {
      if (isMatch) {
        if (confirmed !== true) {
          errors.user = "Please confirm email first";
          return res.status(404).json(errors);
        } else {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 360000 },
            (err, token) => {
              res.json({
                sucess: true,
                token: token,
              });
            }
          );
        }
      } else {
        errors.password = "Password inccorect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  })
);

router.post("/confirmation/:token", async (req, res) => {
  try {
    const email = req.body.email;
    const token = req.params.token;
    let verifyuser = await User.findOne({ email });
    const secret_token = await bcrypt.hash(
      verifyuser.id,
      verifyuser.confirmedKey
    );
    let { user } = jwt.verify(token, secret_token);
    if (verifyuser._id == user) {
      await verifyuser.updateOne({ confirmed: true });
      await verifyuser.updateOne({ $unset: { confirmedKey: 1 } });
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "Cannot confirm user" }] });
  }
});

router.post("/recovery", async (req, res) => {
  try {
    const email = req.body.email;
    const recoveryUser = await User.findOne({ email });
    const salty = await bcrypt.genSalt(10);
    const secret_key = await bcrypt.hash(email, salty);
    const newRecoveryToken = await bcrypt.hash(email, secret_key);
    const cleanToken = newRecoveryToken.replace(/[/]/g, "");
    if (recoveryUser == "") {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    } else {
      const resEmail = recoveryMailer(recoveryUser, cleanToken);
      var finChecker = await resEmail.then((value) => {
        return value;
      });
      if (finChecker == true) {
        await recoveryUser.updateOne({
          recoveryToken: cleanToken,
        });
      }
      return true;
    }
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "Invalid  Email" }] });
  }
});

router.post("/recovery/:token", async (req, res) => {
  try {
    const email = req.body.email;
    const newPassword = req.body.password;
    const token = req.params.token;
    const recoveryUser = await User.findOne({ email });
    if (recoveryUser.recoveryToken == token) {
      const salt = await bcrypt.genSalt(10);
      const cryptPassword = await bcrypt.hash(newPassword, salt);
      await recoveryUser.updateOne({ password: cryptPassword });
      await recoveryUser.updateOne({ $unset: { recoveryToken: 1 } });
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "Cannot update user" }] });
  }
});

module.exports = router;
