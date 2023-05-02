import React, { useContext, useState } from 'react';
import './navigation.styles.scss';
import { UserContext } from '../../context/user.context';
import {
	useNavigate,
	Link,
	Outlet,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import jwt_decode from 'jwt-decode';
import {
	loggedIn,
	getToken,
	logout,
	Notification,
} from '..';
import { withAuth } from '../../hoc/auth/auth.hoc';
import bell from './bell.svg';
function Navigation() {
	const [notification, setNotification] = useState(false);
	const navigate = useNavigate();
	const { setCurrentUserToken } = useContext(UserContext);
	const Socket = io('http://localhost:7000/', {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${getToken()}`,
				},
			},
		},
	});
	React.useEffect(() => {
		Socket.on('connect', (socket) => {
			console.log('connected');
		});
		return () => {
			Socket.on('disconnect', (socket) => {
				console.log('disconnected');
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	Socket.on('notification', (data) => {
		console.log(data);
	});
	return (
		<>
			<Notification
				open={notification}
				onClose={() => setNotification(false)}
			/>
			<div className='navigation'>
				<div className='navigation__container'>
					<div className='navigation__logo'>
						<Link to='/'>Helpdesk</Link>
					</div>
					{loggedIn() &&
						!jwt_decode(getToken()).isResolver && (
							<nav>
								<Link to='tickets'>Tickets</Link>
								<Link to='create-tickets'>Create</Link>
							</nav>
						)}
					{loggedIn() &&
						jwt_decode(getToken()).isResolver && (
							<nav>
								<Link to='tickets'>Tickets</Link>
								<Link>Assigned Tickets</Link>
							</nav>
						)}

					<div className='navigation__activity'>
						<div onClick={() => setNotification(true)}>
							<img src={bell} alt='' />
							<p>132</p>
						</div>
						<button
							className='btn btn--small '
							onClick={() =>
								logout(setCurrentUserToken, navigate)
							}>
							Log Out
						</button>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
}
export default withAuth(Navigation);
