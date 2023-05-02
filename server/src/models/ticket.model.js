const Ticket = require('./ticket.mongo');
const { UserData } = require('../utils/utils');
const getUnResolvedTickets = async (data) => {
	const userData = UserData(data);
	let tickets;
	//if user is not a support agent
	//ticket is not resolved
	//ticket is not escalated
	if (!userData.isResolver) {
		tickets = await Ticket.find({
			isResolved: false,
			ticketRaiserId: userData.id,
			escalated: false,
		});
		if (!tickets) return [];
		return tickets;
	}
	//if user is  a support agent
	//ticket is not resolved
	tickets = await Ticket.find({
		isResolved: false,
	});

	if (!tickets) return [];
	return tickets;
};
const getUnAssignedTickets = async (data) => {
	const userData = UserData(data);
	let tickets;
	//if user is not a support agent
	//ticket is not resolved
	//ticket is not escalated
	tickets = await Ticket.find({
		isResolved: false,
		assigned: false,
	});
	if (!tickets) return [];
	return tickets;
};
const getAssignedTickets = async (data) => {
	const userData = UserData(data);
	let tickets;
	//if user is not a support agent
	//ticket is not resolved
	//ticket is not escalated
	tickets = await Ticket.find({
		isResolved: false,
		assignedTo: { $ne: userData.id },
		assigned: true,
	});
	if (!tickets) return [];
	return tickets;
};

const getEscalatedTickets = async (data) => {
	const userData = UserData(data);
	let tickets;
	//if user is not a support agent
	//ticket is not resolved
	//ticket is  escalated
	if (!userData.isResolver) {
		tickets = await Ticket.find({
			isResolved: false,
			ticketRaiserId: userData.id,
			escalated: true,
		});
		if (!tickets) return [];
		return tickets;
	}
	//if user is  a support agent
	//ticket is not resolved
	//ticket is  escalated
	tickets = await Ticket.find({
		isResolved: false,
		escalated: true,
	});

	if (!tickets) return [];
	return tickets;
};
const getResolvedTickets = async (data) => {
	const userData = UserData(data);
	let tickets;
	//if user is not a support agent
	//ticket is resolved
	if (!userData.isResolver) {
		tickets = await Ticket.find({
			isResolved: true,
			ticketRaiserId: userData.id,
		});
		if (!tickets) return [];
		return tickets;
	}
	//if user is  a support agent
	//ticket is resolved
	//ticket is  resolved by the user
	tickets = await Ticket.find({
		isResolved: true,
		assignedTo: userData.id,
	});
	if (!tickets) return [];
	return tickets;
};
const getAssignedTicketsToUser = async (data) => {
	const userData = UserData(data);
	let tickets;
	//if user is  a support agent
	//ticket is not resolved
	//ticket is  assigned to the user
	tickets = await Ticket.find({
		isResolved: false,
		assignedTo: userData.id,
	});
	if (!tickets) return [];
	return tickets;
};
const createTicket = async (data, token) => {
	const userData = UserData(token);
	const ticketData = {
		...data,
		ticketRaiserId: userData.id,
	};
	const newTicket = new Ticket(ticketData);
	ticket = await newTicket.save();
	if (!ticket) return null;
	else return ticket;
};
const assignTicket = async (data) => {
	const userData = UserData(data.token);
	console.log(userData);
	ticket = await Ticket.findOneAndUpdate(
		{ _id: data.ticketId },
		{ assignedTo: userData.id, assigned: true }
	);
	if (!ticket) return null;
	else return ticket;
};
const getComments = async (ticketId) => {
	const ticket = Ticket.findOne(
		{ _id: ticketId },
		{ __v: 0 }
	);
	if (!ticket) return [];
	return ticket.comments;
};
const setComments = async (data) => {
	let ticket = await Ticket.findOne(
		{ _id: data.ticketId },
		{ __v: 0 }
	);
	ticket = await Ticket.findOneAndUpdate(
		{ _id: data.ticketId },
		{
			comments: [
				...ticket.comments,
				{
					body: data.comment,
					date: new Date(),
					isResolver: data.isResolver,
				},
			],
		}
	);
};
const getTicket = async (ticketId) => {
	const ticket = await Ticket.findOne(
		{ _id: ticketId },
		{ __v: 0 }
	);
	if (!ticket) return {};
	return ticket;
};
module.exports = {
	getUnResolvedTickets,
	getEscalatedTickets,
	getResolvedTickets,
	getAssignedTickets,
	getUnAssignedTickets,
	getAssignedTicketsToUser,
	createTicket,
	assignTicket,
	getComments,
	setComments,
	getTicket,
};
