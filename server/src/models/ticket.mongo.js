const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = require('./comment.mongo');

const TicketSchema = new Schema(
	{
		escalated_at: {
			type: Date,
		},
		escalated: {
			type: Boolean,
			default: false,
		},
		resolved_at: {
			type: Date,
		},
		description: {
			type: String,
		},
		ticketStatus: {
			type: String,
			default: 'InQueue',
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
			type: mongoose.Types.ObjectId,
		},
		ticketRaiserId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		ticketUpdates: [
			{
				updateType: String,
				body: String,
				date: Date,
				fullName: String,
				isResolver: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{ timestamps: true }
);
TicketSchema.pre('save', function (next) {
	now = new Date();
	if (this.isResolved) {
		this.resolved_at = now;
	}
	if (
		(now.getTime() - this.createdAt.getTime()) / 10000 >=
		864000
	) {
		this.escalated = true;
	}
	next();
});
module.exports = mongoose.model('Tickets', TicketSchema);
