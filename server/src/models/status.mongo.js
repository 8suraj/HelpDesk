const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StatusSchema = new Schema(
	{
		action: {
			type: String,
		},
		isResolver: {
			type: Boolean,
			default: false,
		},
		ticketId: {
			type: mongoose.Types.ObjectId,
		},
		body: {
			type: String,
		},
		statusType: {
			type: String,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Status', StatusSchema);
