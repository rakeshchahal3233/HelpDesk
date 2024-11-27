const express = require("express");
const router = express.Router();
const { authenticate, checkRole } = require("../middlewares/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

router.get("/dashboard", authenticate, checkRole(["admin"]), getDashboardData);

module.exports = router;
