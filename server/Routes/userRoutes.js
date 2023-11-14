const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userController'); // Your controller file
const authRoutes = require('./authRoutes');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout); // Add this line for logout
router.use('/auth', authRoutes);

module.exports = router;
