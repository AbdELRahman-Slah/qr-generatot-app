import axios from "axios";
import Toast from "react-native-toast-message";
import { getToken } from "./secureStorage";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong. Please try again.";

    if (error.response) {
      message = error.response.data?.message || error.response.statusText;
    } else if (error.request) {
      message = "No response from server. Check your connection.";
    } else {
      message = error.message;
    }

    Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
      position: "bottom",
    });

    return Promise.reject(error);
  }
);
