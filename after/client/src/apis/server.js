import axios from 'axios';

const serverAPI = axios.create({
  baseURL: 'http://localhost:3000',
});

serverAPI.interceptors.response.use((response) => response.data);

export default serverAPI;
