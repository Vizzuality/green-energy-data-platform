import axios from 'axios';

export const API = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || `${process.env.VERCEL_URL.baseUrl}/api`),
  headers: { 'Content-Type': 'application/json' },
});

export default {
  API,
};
