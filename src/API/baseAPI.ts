import axios from "axios";

const API_URI = import.meta.env.VITE_API_URI

export const API = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const FileAPI = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});