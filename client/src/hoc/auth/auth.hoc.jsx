import React, {
	useContext,
	useState,
	useEffect,
} from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
	loggedIn,
	getToken,
	logout,
} from '../../components';
import { UserContext } from '../../context/user.context';
import jwt_decode from 'jwt-decode';
export const withAuth = (Component) => (props) => {
	const { setCurrentUserToken } = useContext(UserContext);
	const navigate = useNavigate();
	const [isExpired, setIsExpired] = useState(false);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setIsExpired(!loggedIn());
			if (isExpired) {
				clearInterval(intervalId);
			}
		}, 2000);
		return () => clearInterval(intervalId);
	}, [isExpired]);
	if (isExpired) {
		logout(setCurrentUserToken, navigate);
		return <Navigate to='/' />;
	}
	return <Component {...props} />;
};
export const withAuthResolver = (Component) => (props) => {
	const { setCurrentUserToken } = useContext(UserContext);
	const navigate = useNavigate();
	if (jwt_decode(getToken()).isResolver) {
		return <Component {...props} />;
	}
	logout(setCurrentUserToken, navigate);
	return <Navigate to='/' />;
};
export const withAuthRaiser = (Component) => (props) => {
	const { setCurrentUserToken } = useContext(UserContext);
	const navigate = useNavigate();
	if (!jwt_decode(getToken()).isResolver) {
		return <Component {...props} />;
	}
	logout(setCurrentUserToken, navigate);
	return <Navigate to='/' />;
};
