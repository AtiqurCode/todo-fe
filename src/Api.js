import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";

export const Api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
