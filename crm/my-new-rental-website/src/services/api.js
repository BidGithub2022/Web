import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Properties
  getProperties: () => api.get(config.endpoints.properties),
  getPropertyById: (id) => api.get(`${config.endpoints.properties}/${id}`),

  // Auth
  login: (credentials) => api.post(config.endpoints.login, credentials),
  register: (userData) => api.post(config.endpoints.register, userData),
};

export default apiService;