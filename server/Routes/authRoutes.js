const express = require('express');
const router = express.Router();

// Logout endpoint
router.post('/logout', (req, res) => {
  // Add any logout logic here (e.g., destroying the session, removing tokens, etc.)
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
