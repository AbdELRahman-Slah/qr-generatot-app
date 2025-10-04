const { mongoose } = require("mongoose");

const qrSchema = new mongoose.Schema({
  uuid: String,
  createdAt: { type: Date, default: Date.now, expires: 60 },
});

const Qr = mongoose.model("Qr", qrSchema);

module.exports = Qr;
