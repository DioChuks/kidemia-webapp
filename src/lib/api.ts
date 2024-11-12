import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const token = getAuthToken();

const api = axios.create({
  baseURL: 'https://kidemia.silfrica.com/api',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

export default api