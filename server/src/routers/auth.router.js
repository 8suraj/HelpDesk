const { json } = require("express");
const express = require("express");
const User = require("../models/user.model");
const { jwtGen } = require("../utils/utils");
const authRouter = express.Router();

authRouter.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() }).then((existingUser) => {
    if (existingUser !== null) {
      return res
        .status(400)
        .json({ error: "This email is already registered!" });
    }
    if (!req.body.username || !req.body.password) {
      return res
        .status(406)
        .json({ error: "Username or password can't be empty" });
    }
    User.findOne({ username: req.body.username.toLowerCase() }).then(
      (existingUsername) => {
        if (existingUsername !== null) {
          return res
            .status(400)
            .json({ error: "This username already exist!" });
        }
        const newUser = new User(req.body);
        newUser.save().then((user) => {
          if (!user) {
            return res.status(500).json({ error: err });
          }
          const token = jwtGen(user.toObject());
          return res.status(201).json({ success: true, token, user });
        });
      }
    );
  });
});

authRouter.post("/login", (req, res) => {
  User.findOne({ username: req.body.username.toLowerCase() }).then((data) => {
    if (!data || data.password !== req.body.password) {
      return res
        .status(403)
        .json({ error: "Username or password are incorrect" });
    }
    const info = {
      username: data.username,
      email: data.email,
      id: data._id,
      isResolver: data.isResolver,
    };
    const token = jwtGen(info);

    return res.json({ token, success: true, type: data.isResolver });
  });
});

module.exports = { authRouter };
