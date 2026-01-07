const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Patient", "Doctor"],
    required: true,
  },

  age: Number,
  gender: String,
  bloodGroup: String,

  // 📌 Email verification fields
  emailVerified: {
    type: Boolean,
    default: false,
  },

  verificationToken: String,
  verificationExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
