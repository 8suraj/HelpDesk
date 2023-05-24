import { withAuthRaiser } from '../hoc/auth/auth.hoc';
import AssignedTickets from './assignedTickets/assignedTickets.router';
export { default as Login } from './authentication/login/login.router';
export { default as Register } from './authentication/register/register.router';
export { default as Ticket } from './ticket/ticket.router';
export { default as Home } from './index/home.router';
export const AssignedTicket =
	withAuthRaiser(AssignedTickets);
