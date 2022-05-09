import axios from "axios";

const API_BASE_URL = "http://localhost:3001/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

api.defaults.withCredentials = true;

export default api;
