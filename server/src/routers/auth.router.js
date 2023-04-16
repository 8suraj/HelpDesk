const express = require("express");
const {
  isUserEmailExists,
  isUserNameExists,
  createUser,
  verifyUser,
} = require("../models/user.model");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(406)
      .json({ error: "Username or password can't be empty" });
  }
  const existingUser = await isUserEmailExists(req.body.email);
  if (existingUser) {
    return res.status(400).json({ error: "This email is already registered!" });
  }
  const existingName = await isUserNameExists(req.body.username);
  if (existingName) {
    return res.status(400).json({ error: "This username already exist!" });
  }

  const token = await createUser(req.body);
  if (!token) {
    return res.status(500).json({ error: err });
  }
  console.log(token);
  return res.status(201).json({ success: true, token });
});

authRouter.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(406)
      .json({ error: "Username or password can't be empty" });
  }
  const token = await verifyUser(req.body);
  if (!token) {
    return res
      .status(403)
      .json({ error: "Username or password are incorrect" });
  }

  return res.status(200).json({ token, success: true });
});

module.exports = { authRouter };
