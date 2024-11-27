const User = require("../models/User");
const Ticket = require("../models/Ticket");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

// Fetch all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const {password:_,...safeUser} = newUser._doc;

    res.status(201).json({ message: "User created successfully", user: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Unable to create user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    const {password:_,...safeUser} = user._doc;

    res.json({ message: "User updated successfully", user:safeUser });
  } catch (error) {
    res.status(500).json({ message: "Unable to update user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {password:_,...safeUser} = user._doc;

    res.json({ message: "User deleted successfully", user:safeUser });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete user", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming 'user' is populated by the middleware after decoding the token

    // Find the user in the database using Mongoose
    const user = await User.findById(userId).select('id name email');  // Adjust the fields you want to select

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user data
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      // Add other fields as necessary
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = { 
  getAllUsers, 
  addUser, 
  updateUser,
  deleteUser,
  getUser
};
