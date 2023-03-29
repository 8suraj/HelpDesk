import { default as Tickets } from "./tickets/tickets.router";
import { Raiser, Resolver } from "./index/home.router";
import withAuth from "../hoc/auth/auth.hoc";
export { default as Login } from "./authentication/login/login.router";
export { default as Register } from "./authentication/register/register.router";

export const TicketsRouter = withAuth(Tickets);
export const RaiserRouter = withAuth(Raiser);
export const ResolverRouter = withAuth(Resolver);
