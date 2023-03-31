const express = require("express");
const { UserData } = require("../utils/utils");
const Ticket = require("../models/ticket.model");
const ticketRouter = express.Router();
ticketRouter.get("/unresolved", async (req, res) => {
  const userData = UserData(req.headers["authorization"]);
  if (!userData.isResolver) {
    const tickets = await Ticket.find({ isResolved: false, _id: userData._id });
    return res.status(200).json({
      tickets,
    });
  } else {
    const tickets = await Ticket.find({ isResolved: false });
    return res.status(200).json({
      tickets,
    });
  }
});
ticketRouter.get("/resolved", async (req, res) => {
  const userData = UserData(req.headers["authorization"]);
  if (!userData.isResolver) {
    const tickets = await Ticket.find({ isResolved: true, _id: userData._id });
    return res.status(200).json({
      tickets,
    });
  } else {
    const tickets = await Ticket.find({ isResolved: true });
    return res.status(200).json({
      tickets,
    });
  }
});
module.exports = { ticketRouter };
