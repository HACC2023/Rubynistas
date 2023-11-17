const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes'); // Your route file
const sendPaymentEmail = require('./sendPaymentEmail'); 

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes); // Use your user routes


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ZeroWaste:Hacc2023@zerowaste.yzx5dla.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Import the SendGrid library and set API key
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  containers: Number,
  points: Number,
  lastCheckout: Date,
  role: {
    type: String,
    default: 'customer',
  },
});

const User = mongoose.model('User', userSchema);


const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'vendor', // Assign the role 'vendor' to identify vendors
  },
});

const Vendor = mongoose.model('Vendor', vendorSchema);


// Modify the server route
app.get('/api/user/main/:email', async (req, res) => {
  const { email } = req.params;
  console.log('Email parameter:', email);

  try {
    const userData = await User.findOne({ email });

    if (userData) {
      res.status(200).json(userData);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data.');
  }
});



// Register endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password, containers} = req.body;

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

// Register endpoint for vendors
app.post('/api/vendor/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password (in a real-world scenario, you should use bcrypt)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the vendor to the database using the Vendor model
  const vendor = new Vendor({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await vendor.save();
    res.status(201).send('Vendor registered successfully.');
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

// Login endpoint for vendors
app.post('/api/vendor/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the vendor by email and role
  const vendor = await Vendor.findOne({ email, role: 'vendor' });

  if (vendor) {
    // Compare the entered password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, vendor.password);

    if (passwordMatch) {
      // Generate a JWT token for the vendor
      const token = jwt.sign({ userId: vendor._id, role: 'vendor' }, 'your_secret_key', {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } else {
      res.status  (401).send('Invalid credentials.');
    }
  } else {
    res.status(401).send('Vendor not found.');
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
    const updatedUser = await User.findByIdAndUpdate(id, { containers, lastCheckout: new Date() }, { new: true });
//
    if (updatedUser) {
      // If containers is zero, calculate points and update the points field
      if (containers === 0) {
        const points = 5; // Adjust the calculation based on your logic
        updatedUser.points += points;

        // Save the updated user (this line saves the changes to the database)
        await updatedUser.save();

        // Simulate sending an email 24 hours in the future
        setTimeout(async () => {
          const fetchedUser = await User.findById(id);
          if (fetchedUser) {
            sendPaymentEmail(fetchedUser.email, 'Your payment is due!');
          } else {
            console.error('User not found for email sending');
          }
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
        
      }

      res.status(200).json(updatedUser);
    } else {
      res.status(404).send('User not found.');
    }
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

// Additional endpoint to manually trigger email sending
app.post('/api/send-email/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Retrieve the user by ID from the database
    const user = await User.findById(userId);

    if (user) {
      // Simulate the scenario where an email needs to be sent
      sendPaymentEmail(user.email, 'Manually triggered payment email');

      res.status(200).send('Email sent successfully.');
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email.');
  }
});

// Redeem points endpoint
app.post('/api/redeem-points', async (req, res) => {
  const { userEmail, pointsToRedeem } = req.body;

  try {
    // Find the user by email and update the points
    const user = await User.findOne({ email: userEmail });

    if (user) {
      user.points -= pointsToRedeem;
      await user.save();

      // Respond with the updated user data
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.error('Error redeeming points:', error);
    res.status(500).send('Error redeeming points.');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

