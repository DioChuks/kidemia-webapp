import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kidemia.silfrica.com/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export default api