import axios from 'axios';

const authUser = sessionStorage.getItem('userData');
const token = authUser ? JSON.parse(authUser): undefined;

const api = axios.create({
  baseURL: 'https://kidemia.silfrica.com/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

export default api