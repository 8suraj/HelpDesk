const express = require("express");
const Ticket = require("../models/ticket.model");
const { jwtVerify } = require("../utils/utils");
const raiserRouter = express.Router();
raiserRouter.get("/view/unresolved", async (req, res) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ error: "You are unauthorised!" });
  }
  if (!jwtVerify(req.headers["authorization"])) {
    return res.status(401).json({ error: "You are unauthorised!" });
  }
  tickets = await Ticket.find({ isResolved: false });
  res.status(200).json({
    tickets,
  });
});
raiserRouter.get("/view/resolved", async (req, res) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ error: "You are unauthorised!" });
  }
  if (!jwtVerify(req.headers["authorization"])) {
    return res.status(401).json({ error: "You are unauthorised!" });
  }
  tickets = await Ticket.find({ isResolved: true });
  res.status(200).json({
    tickets,
  });
});
raiserRouter.post("/create", async (req, res) => {
  if (!req.headers["authorization"]) {
    return res.status(401).json({ error: "You are unauthorised!" });
  }
  if (!jwtVerify(req.headers["authorization"])) {
    return res.status(401).json({ error: "You are unauthorised!" });
  }

  const newTicket = new Ticket(req.body);
  ticket = await newTicket.save();
  if (ticket) {
    return res.status(200).json({ ticketId: ticket._id });
  } else {
    res.status(400);
  }
});

module.exports = { raiserRouter };
