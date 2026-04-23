import axios, { AxiosError, type AxiosInstance } from "axios";

const BASE_URL = "https://nonfissile-pomaceous-anita.ngrok-free.dev";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API ERROR:", error);
    return Promise.reject(error);
  },
);
