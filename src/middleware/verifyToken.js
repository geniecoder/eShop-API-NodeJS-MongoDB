const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  //console.log("req: ", req);
  console.log("token: ", token);

  // Extract the actual token without the prefix
  const tokenUpdated = token.split(" ")[1]; // Extracts 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  console.log("token updated: ", tokenUpdated);
  jwt.verify(tokenUpdated, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification failed: ", err);
    } else {
      console.log("Token verified successfully: ", decoded);
      req.userId = decoded.id.trim();
    }
  });
 
  next();
};

module.exports = verifyToken;
