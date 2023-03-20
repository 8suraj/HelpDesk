import axios from 'axios';
import { loggedIn,getToken } from '../components/authentication/auth.component';
const axiosClient = axios.create();
axiosClient.defaults.baseURL = 'http://localhost:7000/'+process.env.REACT_APP_API_V1;
axiosClient.defaults.headers = {
  Accept: 'application/json',
  'Content-Type':'application/json',
};

axiosClient.defaults.withCredentials = true;

export function getRequest([URL,param]) {
  return axiosClient
    .get(`/${URL}`,{params:param})
    .then((response) => response);
}

export function postRequest(URL, payload) {
  
  return axiosClient
    .post(`/${URL}`, payload)
    .then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient
    .patch(`/${URL}`, payload)
    .then((response) => response);
}

export function deleteRequest([URL,param]) {
  return axiosClient
    .delete(`/${URL}`,{params:param})
    .then((response) => response);
}

axiosClient.interceptors.request.use((config) => {
  if (loggedIn()) {
    config.headers['Authorization'] = `Bearer ${getToken()}`; 
    console.log(config.headers);
    return config;
  }
  return config;
});