const Ticket = require("./ticket.mongo");
const { UserData } = require("../utils/utils");
const getUnResolvedTickets = async (data) => {
  const userData = UserData(data);
  let tickets;
  if (!userData.isResolver) {
    tickets = await Ticket.find({
      isResolved: false,
      ticketRaiserId: userData.id,
    });
  }
  tickets = await Ticket.find({ isResolved: false });
  if (!tickets) return [];
  return tickets;
};
const getResolvedTickets = async (data) => {
  const userData = UserData(data);
  let tickets;
  if (!userData.isResolver) {
    tickets = await Ticket.find({
      isResolved: true,
      ticketRaiserId: userData.id,
    });
  }
  tickets = await Ticket.find({ isResolved: true, assignedTo: userData.id });
  if (!tickets) return [];
  return tickets;
};
const createTicket = async (data) => {
  const newTicket = new Ticket(data);
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
  console.log(ticket);
  if (!ticket) return null;
  else return ticket;
};
module.exports = {
  getUnResolvedTickets,
  getResolvedTickets,
  createTicket,
  assignTicket,
};
