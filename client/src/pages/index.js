// import { default as Tickets } from './tickets/tickets.router';
import { Raiser, Resolver } from './index/home.router';
import {
	withAuthRaiser,
	withAuthResolver,
} from '../hoc/auth/auth.hoc';
export { default as Login } from './authentication/login/login.router';
export { default as Register } from './authentication/register/register.router';
// export { default as TicketDetails } from './tickets/details/ticketDetails.router';

// export const TicketsRouterRaiser = withAuthRaiser(Tickets);
export const RaiserRouter = Raiser;
// export const TicketsRouterResolver =
// 	withAuthResolver(Tickets);
export const ResolverRouter = withAuthResolver(Resolver);
