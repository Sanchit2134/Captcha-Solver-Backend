const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  coins: { type: Number, default: 0 },
  username: { type: String,  unique: true },
});

module.exports = mongoose.model("User", userSchema);

