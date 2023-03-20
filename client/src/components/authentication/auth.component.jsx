import decode from "jwt-decode";
import { postRequest } from "../../api/api";
export const setToken = (userToken) => {
  localStorage.setItem("user_token", userToken);
};

export const getToken = () => localStorage.getItem("user_token");
export const isTokenExpired = (token) => {
  try {
    const decoded = decode(token);
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
    const result = await postRequest("auth/login", payload);
    setCurrentUserToken(result.data.token);
    setToken(result.data.token);
    navigate(-1, { replace: true });
    return null;
  } catch (err) {
    return err.message;
  }
};
export const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

export const logout = (setCurrentUserToken) => {
  localStorage.removeItem("user_token");
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
    const result = await postRequest("api/v1/signup", payload);
    console.log(result);
    setCurrentUserToken(result.data.data.access_token.token);
    setToken(result.data.data.access_token.token);
    navigate("/", { replace: true });
    return null;
  } catch (err) {
    console.log(err.response.data.error.message);
    return err.response.data.error.message;
  }
};
