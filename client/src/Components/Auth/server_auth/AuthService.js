import axios from 'axios';

const API_URL = 'https://zerowaste-newver.onrender.com/api';

// vendor register role
const registerVendor = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/vendor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.message || 'Registration failed.');
    }
  } catch (error) {
    console.error('Error registering vendor:', error);
    return false;
  }
};

// user register role
const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.message || 'Registration failed.');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

// vendor login
const vlogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/vendor/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Save the token in local storage or wherever you manage your authentication state
      localStorage.setItem('token', data.token);
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.message || 'Login failed.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

const AuthService = {
  registerVendor,
  registerUser,
  vlogin,

  register: async (name, email, password, role) => {
    try {
      await axios.post(`${API_URL}/register`, { name, email, password, role });
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

  redeemPoints: async (userId, pointsToRedeem) => {
    try {
      const token = AuthService.getToken();
      const response = await axios.post(
        `${API_URL}/redeem-points/${userId}`,
        { pointsToRedeem },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.ok) {
        return true;
      } else {
        const data = response.data;
        throw new Error(data.message || 'Points redemption failed.');
      }
    } catch (error) {
      console.error('Error redeeming points:', error);
      return false;
    }
  },
};

export default AuthService;


