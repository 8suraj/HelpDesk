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
  if (!ticket) return null;
  else return ticket;
};
const getComments = async (ticketId) => {
  const ticket = Ticket.findOne({ _id: ticketId }, { __v: 0 });
  if (!ticket) return [];
  return ticket.comments;
};
const setComments = async (data) => {
  let ticket = await Ticket.findOne({ _id: data.ticketId }, { __v: 0 });
  ticket = await Ticket.findOneAndUpdate(
    { _id: data.ticketId },
    {
      comments: [
        ...ticket.comments,
        { body: data.comment, date: new Date(), isResolver: data.isResolver },
      ],
    }
  );
  // console.log(ticket.comments);
};
const getTicket = async(ticketId)=>{
  const ticket = await Ticket.findOne({ _id: ticketId }, { __v: 0 });
  if(!ticket) return {};
  return ticket;
}
module.exports = {
  getUnResolvedTickets,
  getResolvedTickets,
  createTicket,
  assignTicket,
  getComments,
  setComments,
  getTicket
};
