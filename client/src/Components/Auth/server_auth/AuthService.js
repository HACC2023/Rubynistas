import axios from 'axios';

const API_URL = 'https://zerowaste-main.onrender.com/api';

const AuthService = {
  register: async (name, email, password) => {
    try {
      await axios.post(`${API_URL}/register`, { name, email, password });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return token !== null;
  },
};

export default AuthService;

