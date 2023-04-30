import React from 'react';
import './navigation.styles.scss';
import { Link, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {
	loggedIn,
	getToken,
} from '../authentication/auth.component';
export function Navigation() {
	return (
		<>
			<div className='navigation'>
				<div className='navigation__container'>
					<div className='navigation__logo'>
						<Link to='/'>Helpdesk</Link>
					</div>
					{loggedIn() &&
						!jwt_decode(getToken()).isResolver && (
							<nav>
								<Link>Tickets</Link>
								<Link to='create-tickets'>Create</Link>
							</nav>
						)}
					{loggedIn() &&
						jwt_decode(getToken()).isResolver && (
							<nav>
								<Link>Tickets</Link>
								<Link>Assigned Tickets</Link>
							</nav>
						)}

					<div className='navigation__activity'>
						<button className='btn btn--small '>
							Log Out
						</button>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
}
