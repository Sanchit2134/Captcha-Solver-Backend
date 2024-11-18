const mongoose = require("mongoose");

const captchaSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Use the generated timestamp as the ID
    text: { type: String, required: true }, // CAPTCHA text
    createdAt: { type: Date, default: Date.now }, // Timestamp of creation
});

module.exports = mongoose.model("Captcha", captchaSchema);
