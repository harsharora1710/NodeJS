const jwt = require('jsonwebtoken');
const config = require('../config');

function generateToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = { generateToken, verifyToken };
