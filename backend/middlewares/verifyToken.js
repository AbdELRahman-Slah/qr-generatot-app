const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("No token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    req.user = decode;

    next()
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = verifyToken;
