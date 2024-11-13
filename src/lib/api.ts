import axios from 'axios';

interface Session {
  user: object;
  token: string;
}

const authUser = sessionStorage.getItem('userData');
const parsed: Session = authUser ? JSON.parse(authUser): undefined;

const api = axios.create({
  baseURL: 'https://kidemia.silfrica.com/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    Authorization: parsed && parsed.token ? `Bearer ${parsed.token}` : undefined,
  },
});

export default api