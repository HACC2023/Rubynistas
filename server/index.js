const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes'); // Your route file


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes); // Use your user routes


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ZeroWaste:Hacc2023@zerowaste.yzx5dla.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Define user schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Hash the password (in a real-world scenario, you should use bcrypt)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (user) {
    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JWT token (in a real-world scenario, you should use a library like jsonwebtoken)
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid credentials.');
    }
  } else {
    res.status(401).send('User not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
