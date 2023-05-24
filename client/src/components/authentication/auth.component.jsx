import decode from 'jwt-decode';
import { postRequest } from '../../api/api';
export const setToken = (userToken) => {
	localStorage.setItem('user_token', userToken);
};

export const getToken = () =>
	localStorage.getItem('user_token');
export const isTokenExpired = (token) => {
	try {
		const decoded = decode(token);
		if (decoded.exp < Date.now() / 1000) {
			return true;
		}
	} catch (err) {
		return false;
	}
	return false;
};
export const login = async (
	email,
	password,
	setCurrentUserToken,
	navigate
) => {
	const payload = JSON.stringify({
		email,
		password,
	});

	try {
		const result = await postRequest('auth/login', payload);
		setCurrentUserToken(result.data.token);
		setToken(result.data.token);
		navigate('/home', { replace: true });

		return null;
	} catch (err) {
		return err.message;
	}
};
export const loggedIn = () => {
	const token = getToken();
	return !!token && !isTokenExpired(token);
};

export const logout = (setCurrentUserToken, navigate) => {
	localStorage.removeItem('user_token');
	setCurrentUserToken(null);
	navigate('/', { replace: true });
};

export const register = async (
	username,
	password,
	email,
	fullName,
	setCurrentUserToken,
	navigate
) => {
	username = username.toUpperCase();
	fullName = fullName.toUpperCase();
	const payload = JSON.stringify({
		username,
		email,
		fullName,
		password,
	});
	try {
		const result = await postRequest(
			'auth/signup',
			payload
		);
		setCurrentUserToken(result.data.token);
		setToken(result.data.token);
		navigate('/', { replace: true });
		return null;
	} catch (err) {
		return err;
	}
};
