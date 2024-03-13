import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { json, redirect } from "react-router-dom";
import dayjs from "dayjs";

let accessToken = localStorage.getItem("token");
let refreshToken = localStorage.getItem("refresh_token");
const baseURL = "http://localhost:8000/api/";

const perm_axios = axios.create({
  baseURL: baseURL,
  "Content-type": "application/json",
});

perm_axios.interceptors.request.use(
  (config) => {
    accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

perm_axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        refreshToken = localStorage.getItem("refresh_token");
        console.log(refreshToken);
        const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        accessToken = response.data.access;
        refreshToken = response.data.refresh;

        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("token", accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log("returning token");
        return axios(originalRequest);
      } catch (error) {
        console.log(`${error} jib,rf`);
      }
    }

    return Promise.reject(error);
  },
);

export default perm_axios;