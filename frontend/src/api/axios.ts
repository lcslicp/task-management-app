import axios from 'axios';

export default axios.create({
  baseURL: 'https://task-management-app-production-cd8c.up.railway.app',
  withCredentials: true, 
});