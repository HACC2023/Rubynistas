const User = require('../Models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    // Check if user is authenticated (you might need to modify this based on your authentication mechanism)
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User is not authenticated' });
    }

    // Fetch user information from the database based on the stored user ID in the session
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User not found in the database' });
    }

    // Attach the user object to the request for further use in the route handlers
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'InternalServerError', message: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;
;
