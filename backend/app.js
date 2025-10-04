const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routers/auth.router");
const AppError = require("./utils/appError");
const connectDB = require("./config/db");
const qrRouter = require("./routers/qr.router");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");

app.use(helmet());

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  if (req.headers) req.headers = mongoSanitize.sanitize(req.headers);
  next();
});

connectDB();

app.use("/auth", limiter, authRouter);
app.use("/qr", limiter, qrRouter);

app.all("/*splat", (req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something went wrong",
  });
});

module.exports = app;
