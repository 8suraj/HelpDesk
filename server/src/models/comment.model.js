const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  raiserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  resolverId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created_at: {
    type: Date,
  },
});
CommentSchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
module.exports = mongoose.model("Comment", CommentSchema);
