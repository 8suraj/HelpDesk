const Status = require('./status.mongo');
const { UserData } = require('../utils/utils');

const getStatusAll = async (ticketId) => {
	const status = await find({ ticketId: ticketId });
	if (!status) return [];
	return status;
};
// const getStatusCommentsAll = async (ticketId) => {
// 	const status = await find({ ticketId: ticketId,statusType:"Comment" });
// 	if (!status) return [];
// 	return status;
// };
const getStatusTicketStatus = async (ticketId) => {
	const status = await find({
		ticketId: ticketId,
		statusType: 'Ticket Update',
	});
	if (!status) return [];
	return status;
};
const createStatus = async (data) => {
	const StatusData = data;
	const newStatus = new Status(ticketData);
	ticket = await newTicket.save();
	if (!ticket) return null;
	else return ticket;
};
const updateStatus = async (data) => {};
