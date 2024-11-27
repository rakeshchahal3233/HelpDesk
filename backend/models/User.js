const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true, 
    match: [/.+@.+\..+/, "Please enter a valid email address"], 
  },

  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  role: {
    type: String,
    enum: ["customer", "agent", "admin"], 
    required: true,
    default: "customer",
  },

  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
