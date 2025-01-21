import axios from "axios";

interface Session {
  user: object;
  token: string;
}

export const env = {
  prod: "https://kidemia-backend-production.up.railway.app/api",
  local: "http://localhost:8000/api",
  clientUrl: "https://kidemia.netlify.app",
  localClientUrl: "http://localhost:5173",
};

const api = axios.create({
  baseURL: env.prod,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
  (config) => {
    const authUser = sessionStorage.getItem("userData");
    const parsed: Session = authUser ? JSON.parse(authUser) : undefined;

    if (parsed && parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    } else {
      delete config.headers.Authorization; // Ensure header is removed if no token
    }

    return config;
  },
  (error) => {
    // Handle errors here
    return Promise.reject(error);
  }
);

export default api;