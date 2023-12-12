import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
});

export const googleApi = axios.create({
  baseURL: 'https://www.googleapis.com/oauth2/v1',
});
