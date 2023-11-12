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
  name: String,
  email: String,
  password: String,
  containers: Number,
  points: Number,
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password, containers } = req.body;

  // Hash the password (in a real-world scenario, you should use bcrypt)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const user = new User({
    name,
    email,
    password: hashedPassword,
    containers: 0,
    points: 0,
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

// Logout endpoint
app.post('/api/logout', (req, res) => {
  // You may want to add additional cleanup logic here.
  
  // If you're using JWT, you could provide a new token to the client to replace the old one.
  // This effectively invalidates the old token.
  const newToken = jwt.sign({ userId: null }, 'your_secret_key', { expiresIn: 0 });

  res.status(200).json({ token: newToken, message: 'Logout successful.' });
});


// Search users endpoint
app.get('/api/user/search/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Search for users with a matching email
    const searchResults = await User.find({ email });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error searching for users:', error);
    res.status(500).send('Error searching for users.');
  }
});

// Update containers endpoint
app.put('/api/user/update/:id', async (req, res) => {
  const { id } = req.params;
  const { containers } = req.body;

  try {
    // Find the user by ID and update the containers field
    const updatedUser = await User.findByIdAndUpdate(id, { containers }, { new: true });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send('User not found.');
    }

    // If containers is zero, calculate points and update the points field
    if (containers === 0) {
      const points = 5; // Adjust the calculation based on your logic
      updatedUser.points += points;
    }

    // Save the updated user (this line saves the changes to the database)
    await updatedUser.save();

  } catch (error) {
    console.error('Error updating containers:', error);
    res.status(500).send('Error updating containers.');
  }
});

// Define a route to handle the PUT request for updating user points
app.put('/api/user/update/:userId', (req, res) => {
  const { id } = req.params.userId;
  const { points } = req.body;

  // Find the user in the mock data
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update the user's points
  user.points = points;

  // Send a success response
  res.status(200).json({ message: 'Points updated successfully', user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
