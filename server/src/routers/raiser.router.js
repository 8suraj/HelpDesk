const express = require("express");
const Ticket = require("../models/ticket.model");

const raiserRouter = express.Router();

raiserRouter.post("/create", async (req, res) => {
  const newTicket = new Ticket(req.body);
  ticket = await newTicket.save();
  if (ticket) {
    return res.status(200).json({ ticketId: ticket._id });
  } else {
    res.status(400);
  }
});

module.exports = { raiserRouter };
