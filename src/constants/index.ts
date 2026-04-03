import axios from "axios";

//production
export const API_URL = "https://socio-legal-backend.onrender.com/api";

//development
// export const API_URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
