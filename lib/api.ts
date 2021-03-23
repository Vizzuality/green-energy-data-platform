import axios from 'axios';

export const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FAKE_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});

export default {
  API,
};
