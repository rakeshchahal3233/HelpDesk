const express = require("express");
const router = express.Router();
const {createTicket, getTickets, getTicketById, updateTicket, addNoteToTicket, userTickets } = require("../controllers/ticketController");
const { authenticate, checkRole } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Get all tickets (Admin & Customer Service Agent only)
router.get("/", authenticate, checkRole(["admin", "agent"]), getTickets);

// Customer creates a ticket
router.post("/create", authenticate, checkRole(["customer"]), createTicket);

// Get a specific ticket (Customer can only access their own)
router.get("/ticket/:id", authenticate, getTicketById);

// Update ticket status (Admin & Agent only)
router.patch("/status/:id", authenticate, checkRole(["admin", "agent"]), updateTicket);

// Add note to a ticket (Customer, Admin, or Agent)
router.post("/notes/:id", authenticate,upload.single("attachment"), addNoteToTicket);

// Route to fetch all tickets for the authenticated user with "customer" role
router.get("/my-tickets",authenticate, checkRole(["customer"]),userTickets);

module.exports = router;
