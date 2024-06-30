const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  // Extract the actual token without the prefix
  const tokenUpdated = token.split(" ")[1]; // Extracts 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  console.log("token updated: ", tokenUpdated);
  jwt.verify(tokenUpdated, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token is expired
        return res.status(401).json({ message: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        // Token is invalid
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        // Other errors
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // Token verified successfully
      req.userId = decoded.id.trim();
      next(); // Proceed to the next middleware or route handler
    }
  });
};

module.exports = verifyToken;
