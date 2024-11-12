import axios from 'axios';

const authUser = sessionStorage.getItem('userData');
const parsed = authUser ? JSON.parse(authUser): undefined;

const api = axios.create({
  baseURL: 'https://kidemia.silfrica.com/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    Authorization: parsed.token ? `Bearer ${parsed.token}` : undefined,
  },
});

export default api