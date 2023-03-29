const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  escalated_at: {
    type: Date,
  },
  escalatable: {
    type: Boolean,
  },
  resolved_at: {
    type: Date,
  },
  ticketStatus: {
    type: String,
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
    default: false,
  },
  assignedTo: {
    type: String,
  },
  ticketRaiserId: {
    type: String,
    required: true,
  },
  comments: [{ body: String, date: Date }],
});
TicketSchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
    this.escalatable = false;
    this.ticketStatus = "In-queue";
  }
  if (this.isResolved) {
    this.resolved_at = now;
  }
  if (this.comments.body) {
    this.date = now;
  }
  if (this.created_at.getTime() / 10000 >= 864000) {
    this.escalatable = true;
  }
  next();
});
module.exports = mongoose.model("Tickets", TicketSchema);
