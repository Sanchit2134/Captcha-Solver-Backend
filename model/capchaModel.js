const mongoose = require("mongoose");

const captchaSchema = new mongoose.Schema({
  _id: String, 
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, 
});

captchaSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 }); 

module.exports = mongoose.model("Captcha", captchaSchema);
