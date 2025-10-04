const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = generateToken;
