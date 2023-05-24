const express = require('express');
const {
	getUnResolvedTickets,
	getResolvedTickets,
	getEscalatedTickets,
	createTicket,
	assignTicket,
	getTicket,
	getAssignedTickets,
	getUnAssignedTickets,
	getAssignedTicketsToUser,
} = require('../models/ticket.model');
const Ticket = require('../models/ticket.model');
const ticketRouter = express.Router();

ticketRouter.get('/unresolved', async (req, res) => {
	const tickets = await getUnResolvedTickets(
		req.headers['authorization']
	);
	return res.status(200).json({
		tickets,
	});
});
ticketRouter.get('/escalated', async (req, res) => {
	const tickets = await getEscalatedTickets(
		req.headers['authorization']
	);
	return res.status(200).json({
		tickets,
	});
});
ticketRouter.get('/resolved', async (req, res) => {
	const tickets = await getResolvedTickets(
		req.headers['authorization']
	);
	return res.status(200).json({
		tickets,
	});
});
ticketRouter.post('/assign', async (req, res) => {
	ticket = await assignTicket({
		ticketId: req.body.ticketId,
		token: req.headers['authorization'],
	});
	if (!ticket) return res.status(400);
	return res.status(200).json({ ticketId: ticket._id });
});
ticketRouter.get('/assigned', async (req, res) => {
	const tickets = await getAssignedTickets(
		req.headers['authorization']
	);
	return res.status(200).json({
		tickets,
	});
});
ticketRouter.get('/unassigned', async (req, res) => {
	const tickets = await getUnAssignedTickets(
		req.headers['authorization']
	);
	return res.status(200).json({
		tickets,
	});
});
ticketRouter.get('/assigned-user', async (req, res) => {
	let tickets;
	const Tickets = await getAssignedTicketsToUser(
		req.headers['authorization']
	);
	let sorted = req.query.sorted;
	if (sorted) {
		let Resolved = [],
			InQueue = [],
			Escalated = [],
			InProgress = [];
		Tickets.forEach((item) => {
			if (item.ticketStatus === 'In-Queue') {
				InQueue.push(item);
			}
			if (item.ticketStatus === 'InProgress') {
				InProgress.push(item);
			}
			if (item.escalated) {
				Escalated.push(item);
			}
			if (item.isResolved) {
				Resolved.push(item);
			}
		});
		tickets = {
			Resolved,
			InQueue,
			InProgress,
			Escalated,
		};
	} else {
		tickets = Tickets;
	}
	console.log(tickets);
	return res.status(200).json({
		tickets,
	});
});
ticketRouter.get('/details', async (req, res) => {
	const ticket = await getTicket(req.query.ticketId);
	if (!ticket) res.status(404);
	return res.status(200).json({ ticket });
});
ticketRouter.post('/create', async (req, res) => {
	ticket = await createTicket(
		req.body,
		req.headers['authorization']
	);
	if (!ticket) return res.status(400);
	return res.status(200).json({ ticketId: ticket._id });
});
ticketRouter.post('/update', async (req, res) => {
	ticket = await createTicket(
		req.body,
		req.headers['authorization']
	);
	if (!ticket) return res.status(400);
	return res.status(200).json({ ticketId: ticket._id });
});

module.exports = { ticketRouter };
