const express = require("express");
const ticket = require("../models/ticket.model");
const raiserRouter = express.Router();
raiserRouter.get("/view", (req, res) => {
  console.log("ticket view");
  res.status(200).json({
    ad: "ticket view",
  });
});
raiserRouter.post("/create", (req, res) => {
  console.log("ticket create");
  console.log(req.body);
  console.log(req.headers["authorization"]);
  res.status(200).json({
    ticketId: "someId",
  });
});
// raiserRouter.get('/')

module.exports = { raiserRouter };
