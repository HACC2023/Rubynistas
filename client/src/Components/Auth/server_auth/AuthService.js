import axios from 'axios';

const API_URL = 'https://zerowaste-main.onrender.com/api';

// vendor register role
const registerVendor = async (name, email, password) => {
  try {
    const response = await fetch('http://localhost:3001/api/vendor/register', {
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
    const response = await fetch('http://localhost:3001/api/register', {
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
    const response = await fetch('http://localhost:3001/api/vendor/login', {
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
  }};
/*
getRole: async (email) => {
  try {
    const response = await axios.get(`${API_URL}/user/role`, {
      params: { email }, // Send email as a query parameter
    });
    return response.data.role; // Assuming the server returns the user's role
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve user role');
  }
  */





export default AuthService;

