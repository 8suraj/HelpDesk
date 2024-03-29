import { withAuth } from '../hoc/auth/auth.hoc';
import Navigations from './navbar/navigation.components';
export {
	InputField,
	TextField,
	Select,
} from './inputField/inputField.component';
export { default as CreateTicket } from './createTicket/createTicket.components';

export { default as Hero } from './hero/hero.components';
export { Modal } from './modal/modal.component';
export { default as Notification } from './notification/notfication.component';
export {
	getToken,
	login,
	loggedIn,
	logout,
	register,
} from './authentication/auth.component';
export const Navigation = withAuth(Navigations);
