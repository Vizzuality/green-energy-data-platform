import axios from 'axios';

export const API = axios.create({
  baseURL: `${process.env.NEXTAUTH_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export default {
  API,
};
