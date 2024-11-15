import axios from 'axios';

interface Session {
  user: object;
  token: string;
}

const authUser = sessionStorage.getItem('userData');
const parsed: Session = authUser ? JSON.parse(authUser): undefined;
const env = {
  prod: "https://kidemia-backend-production.up.railway.app/api",
  local: 'http://localhost:8000/api'
}

const api = axios.create({
  baseURL: env.local,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    Authorization: parsed && parsed.token ? `Bearer ${parsed.token}` : undefined,
  },
});

export default api