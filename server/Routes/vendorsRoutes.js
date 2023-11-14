const express = require('express');
const router = express.Router();
const VendorsController = require('../Controllers/vendorsController'); // Update the controller file import
const authRoutes = require('./authRoutes');

router.post('/register', VendorsController.register); // Update the controller method
router.post('/login', VendorsController.login); // Update the controller method
router.post('/logout', VendorsController.logout); // Update the controller method
router.use('/auth', authRoutes);

module.exports = router;
