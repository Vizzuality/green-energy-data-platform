import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL ? '/api' : process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default {
  API,
};
