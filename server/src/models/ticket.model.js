const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
  },
  escalatedAt: {
    type: Date,
  },
  resolvedAt: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  ticketType: {
    type: String,
    required: true,
  },
  assigned: {
    type: Boolean,
    required: true,
    default: false,
  },
  assignedTo: {
    type: String,
  },
  ticketRaiser: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tickets", TicketSchema);
