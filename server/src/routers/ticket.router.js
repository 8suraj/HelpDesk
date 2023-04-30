const express = require('express');
const {
	getUnResolvedTickets,
	getResolvedTickets,
	createTicket,
	assignTicket,
	getTicket,
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
ticketRouter.get('/resolved', async (req, res) => {
	const tickets = await getResolvedTickets(
		req.headers['authorization']
	);
	return res.status(200).json({
		tickets,
	});
});
ticketRouter.post('/create', async (req, res) => {
	ticket = await createTicket(req.body);
	if (!ticket) return res.status(400);
	return res.status(200).json({ ticketId: ticket._id });
});
ticketRouter.post('/assign', async (req, res) => {
	ticket = await assignTicket({
		ticketId: req.body.ticketId,
		token: req.headers['authorization'],
	});
	if (!ticket) return res.status(400);
	return res.status(200).json({ ticketId: ticket._id });
});
ticketRouter.get('/details', async (req, res) => {
	const ticket = await getTicket(req.query.ticketId);
	if (!ticket) res.status(404);
	return res.status(200).json({ ticket });
});
module.exports = { ticketRouter };
