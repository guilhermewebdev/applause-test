import axios from 'axios';
import '@types/node';

const {
  NEXT_PUBLIC_API_URL
} = process.env;

export const client = axios({
  baseURL: NEXT_PUBLIC_API_URL,
})