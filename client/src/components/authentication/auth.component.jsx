import decode from 'jwt-decode';
import { postRequest } from '../../api/api';
/* eslint-disable no-unused-vars */

// Saves user token to localStorage
export const setToken = (userToken) => {
  localStorage.setItem('user_token', userToken);
};

// Retrieves the user token from localStorage
export const getToken = () =>
  localStorage.getItem('user_token');
// Checking if token is expired.
export const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
    console.log(decoded);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
  return false;
};
export const login = async (
  username,
  password,
  setCurrentUserToken,
  navigate
) => {
  const payload = JSON.stringify({
    username,
    password,
  });
  try {
    const result = await postRequest(
      'api/v1/signin',
      payload
    );
    setCurrentUserToken(
      result.data.data.access_token.token
    );
    setToken(result.data.data.access_token.token);
    navigate(-1, { replace: true });
    return null;
  } catch (err) {
    // console.log(err.response.data.error.message);
    return err.response.data.error.message;
  }
  return;
};
export const loggedIn = () => {
  // Checks if there is a saved token and it's still valid
  const token = this.getToken(); // Getting token from localstorage
  return !!token && !this.isTokenExpired(token); // handwaiving here
};

// Clear user token and profile data from localStorage
export const logout = (setCurrentUserToken) => {
  localStorage.removeItem('user_token');
  setCurrentUserToken(null);
};

export const register = async (
  name,
  password,
  email,
  mobile,
  setCurrentUserToken,
  navigate
) => {
  const payload = JSON.stringify({
    username: name,
    email,
    mobile,
    password,
  });
  console.log(payload);
  try {
    const result = await postRequest(
      'api/v1/signup',
      payload
    );
    console.log(result);
    setCurrentUserToken(
      result.data.data.access_token.token
    );
    setToken(result.data.data.access_token.token);
    navigate('/', { replace: true });
    return null;
  } catch (err) {
    console.log(err.response.data.error.message);
    return err.response.data.error.message;
  }
};