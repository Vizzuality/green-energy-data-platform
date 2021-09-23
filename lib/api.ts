import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

const onResponseSuccess = (response) => response;

// Any status codes that falls outside the range of 2xx cause this function to trigger
// Do something with response error
const onResponseError = (error) => Promise.reject(error);

API.interceptors.response.use(onResponseSuccess, onResponseError);

export default API;
