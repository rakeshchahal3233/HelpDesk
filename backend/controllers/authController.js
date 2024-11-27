const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
  
      // Generate a token for the new user
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      // Remove sensitive data before sending the response
      const { password: _, ...safeUser } = newUser._doc;
  
      res.status(201).json({
        message: "User registered successfully",
        token, // Include the token in the response
        user: safeUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
  
// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const {password:_,...safeUser} = user._doc;

    res.json({ message: "Login successful", token, user:safeUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
    registerUser,
    loginUser
};