import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = '';
axiosClient.defaults.headers = {
  Accept: 'application/json',
  // ContentType: 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  // credentials: 'same-origin',
};

// All request will wait 2 seconds before timeout

// axiosClient.defaults.timeout = 10000;
// axiosClient.defaults.headers.post['Content-Type'] =
//   'application/json;charset=utf-8';

// cross-site Access-Control requests
axiosClient.defaults.withCredentials = false;

export function getRequest(URL) {
  return axiosClient
    .get(`/${URL}`)
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

export function deleteRequest(URL) {
  return axiosClient
    .delete(`/${URL}`)
    .then((response) => response);
}