const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
});

const userModel = mongoose.model("Todo", userSchema);

module.exports = userModel;
