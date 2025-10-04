const express = require("express");
const qrRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const qrService = require("../services/qr.service");

qrRouter.get("/current", verifyToken, (req, res) => {
  
  res.status(200).json({
    status: "success",
    data: { uuid: qrService.getCurrent() },
  });
});

module.exports = qrRouter;
