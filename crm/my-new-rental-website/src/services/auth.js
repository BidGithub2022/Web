const API_URL = process.env.NODE_ENV === 'development' 
  ? '/api'  // Use relative path for development
  : 'http://localhost:8000/api'; // Use absolute path for production

console.log('Current Environment:', process.env.NODE_ENV);
console.log('API URL:', API_URL);

const authService = {
  // Staff Login Level 1
  staffLoginLevel1: async (email, password_hint) => {
    try {
      console.log('Attempting Level 1 login:', { email, password_hint });
      
      const endpoint = process.env.NODE_ENV === 'development'
        ? '/api/auth/staff/login/level1'
        : `${API_URL}/auth/staff/login/level1`;

      console.log('Using endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password_hint }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) throw new Error(data.message || 'Failed to login');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  },

  // Staff Login Level 2
  staffLoginLevel2: async (email, actual_password) => {
    try {
      console.log('Attempting Level 2 login:', { email });
      
      const endpoint = process.env.NODE_ENV === 'development'
        ? '/api/auth/staff/login/level2'
        : `${API_URL}/auth/staff/login/level2`;

      console.log('Using endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, actual_password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) throw new Error(data.message || 'Failed to login');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  },

  // Tenant Login
  tenantLogin: async (emailOrPhone, password) => {
    try {
      console.log('Attempting tenant login with:', { emailOrPhone, password });
      
      const endpoint = process.env.NODE_ENV === 'development'
        ? '/api/auth/tenant/login'
        : `${API_URL}/auth/login`;

      console.log('Using endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) throw new Error(data.message || 'Failed to login');
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  },

  verifyToken: async (token) => {
    try {
      console.log('Verifying token:', token);
      
      const endpoint = process.env.NODE_ENV === 'development'
        ? '/api/verify-token'
        : `${API_URL}/verify-token`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Token verification response:', data);

      if (!response.ok) throw new Error(data.message || 'Token verification failed');
      return data;
    } catch (error) {
      console.error('Token verification error:', error);
      throw new Error(error.message || 'Token verification failed');
    }
  },

  // Register Lead
  registerLead: async (userData) => {
    try {
      console.log('Attempting to register lead:', userData);

      const endpoint = process.env.NODE_ENV === 'development'
        ? '/api/auth/register'
        : `${API_URL}/auth/register`;

      console.log('Using endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (!response.ok) throw new Error(data.message || 'Failed to register');
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Failed to register');
    }
  },
};

export default authService;