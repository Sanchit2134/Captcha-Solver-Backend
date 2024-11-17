const mongoose = require("mongoose");

const captchaSchema = new mongoose.Schema({
  _id: String, // Use unique ID for CAPTCHA
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Add timestamp
});

captchaSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 }); // TTL index

module.exports = mongoose.model("Captcha", captchaSchema);
