const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseUrl = API_URL;
  }

  // Helper method for making authenticated requests
  async fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Generic GET request
  async get(endpoint) {
    return this.fetchWithAuth(endpoint, { method: 'GET' });
  }

  // Generic POST request
  async post(endpoint, data) {
    return this.fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Generic PUT request
  async put(endpoint, data) {
    return this.fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Generic DELETE request
  async delete(endpoint) {
    return this.fetchWithAuth(endpoint, { method: 'DELETE' });
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;