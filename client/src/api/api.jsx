import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = 'http://localhost:7000';
axiosClient.defaults.headers = {
  Accept: 'application/json',
};

axiosClient.defaults.withCredentials = false;

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