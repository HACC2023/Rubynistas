const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../Models/vendorModel'); // Update the model file import

const VendorsController = {
  register: async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      // Check if the vendor already exists
      const existingVendor = await Vendor.findOne({ email });
      if (existingVendor) {
        return res.status(400).json({ message: 'Vendor already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new vendor
      const newVendor = new Vendor({
        name,
        email,
        password: hashedPassword,
        role,
      });

      // Save the vendor to the database
      await newVendor.save();

      res.status(201).json({ message: 'Vendor registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the vendor by email
      const vendor = await Vendor.findOne({ email });

      if (vendor) {
        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, vendor.password);

        if (passwordMatch) {
          // Generate a JWT token
          const token = jwt.sign({ vendorId: vendor._id }, 'your_secret_key', { expiresIn: '1h' });

          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ message: 'Vendor not found' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: async (req, res) => {
    // Assuming you're using JWT for authentication

    // Extract the token from the request header
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      jwt.verify(token, 'your_secret_key');

      // If verification is successful, the token is valid
      // You can add additional logic here, such as blacklisting the token
      // or removing it from the client-side storage

      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = VendorsController;
