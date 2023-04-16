const express = require("express");
const comment = require("../models/comment.model");

const commentRouter = express.Router();

module.exports = { commentRouter };
