import axios from 'axios';

const {
  NEXT_PUBLIC_API_URL,
  API_URL
} = process.env;

export const client = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
})

export const serverClient = axios.create({
  baseURL: API_URL,
})
