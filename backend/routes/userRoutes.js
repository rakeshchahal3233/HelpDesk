const express = require("express");
const router = express.Router();
const { authenticate, checkRole } = require("../middlewares/authMiddleware");
const {getAllUsers, addUser, updateUser, deleteUser,getUser} = require("../controllers/userController");

// View all users (admin only)
router.get("/", authenticate, checkRole(["admin"]), getAllUsers);

// Add a new user (admin only)
router.post("/add", authenticate, checkRole(["admin"]), addUser);

// Update user (admin only)
router.patch("/update/:id", authenticate, checkRole(["admin"]), updateUser);

// Delete user (admin only)
router.delete("/delete/:id", authenticate, checkRole(["admin"]), deleteUser);

router.get("/user",authenticate,getUser);

module.exports = router;
