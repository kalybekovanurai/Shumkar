import axios, { AxiosError, type AxiosInstance } from "axios";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const BASE_URL = "https://nonfissile-pomaceous-anita.ngrok-free.dev";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});
let customStore: Store<RootState> | undefined;

export const injectStore = (store: Store<RootState>) => {
  customStore = store;
};

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config };


    // const token = customStore?.getState().auth.accessToken;

    // if (token) {
    //   updatedConfig.headers.Authorization = `Bearer ${token}`;
    // }

    return updatedConfig;
  },
  (error: AxiosError) => Promise.reject(error),
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API ERROR:", error);
    return Promise.reject(error);
  },
);
