import axios from "axios";

axios.defaults = Object.assign(axios.defaults, {
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const api = axios;
