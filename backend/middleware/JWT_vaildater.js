const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const secret = process.env.JWT_SCRECT_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

  // Token format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token)

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
