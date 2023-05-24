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
	//tickets not assigned to user
	tickets = await Ticket.find({
		isResolved: false,
		assignedTo: { $ne: userData.id },
		assigned: true,
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
		// isResolved: false,
		assignedTo: userData.id,
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

const createTicket = async (data, token) => {
	const userData = UserData(token);
	const ticketData = {
		...data,
		ticketRaiserId: userData.id,
		ticketUpdates: [
			{
				updateType: 'status',
				body: 'Created',
				date: new Date(),
				fullName: userData.fullName,
			},
		],
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
const setUpdates = async (data) => {
	let ticket = await Ticket.findOne(
		{ _id: data.ticketId },
		{ __v: 0 }
	);
	if (data.updateType === 'assignment') {
		ticket = await Ticket.findOneAndUpdate(
			{
				_id: data.ticketId,
			},
			{
				assigned: true,
				assignedTo: data.resolverId,
			}
		);
	}
	if (data.updateType === 'status') {
		if (data.body === 'Escalated') {
			ticket = await Ticket.findOneAndUpdate(
				{ _id: data.ticketId },
				{
					ticketStatus: data.body,
					escalated: true,
					ticketUpdates: [
						...ticket.ticketUpdates,
						{
							...data,
							date: new Date(),
						},
					],
				}
			);
		}
		if (data.body === 'Resolved') {
			ticket = await Ticket.findOneAndUpdate(
				{ _id: data.ticketId },
				{
					ticketStatus: data.body,
					isResolved: true,
					ticketUpdates: [
						...ticket.ticketUpdates,
						{
							...data,
							date: new Date(),
						},
					],
				}
			);
		}
		ticket = await Ticket.findOneAndUpdate(
			{ _id: data.ticketId },
			{
				ticketStatus: data.body,
				ticketUpdates: [
					...ticket.ticketUpdates,
					{
						...data,
						date: new Date(),
					},
				],
			}
		);
	} else {
		ticket = await Ticket.findOneAndUpdate(
			{ _id: data.ticketId },
			{
				ticketUpdates: [
					...ticket.ticketUpdates,
					{
						...data,
						date: new Date(),
					},
				],
			}
		);
	}
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
	setUpdates,
	getTicket,
};
