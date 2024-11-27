const Ticket = require("../models/Ticket");
const User = require("../models/User");

const createTicket = async (req, res) => {
  const { title } = req.body;

  try {
    const ticket = new Ticket({
      title,
      customer: req.user.id,
    });

    await ticket.save();
    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Unable to create ticket", error: error.message });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("customer", "name email")
      .sort({ lastUpdatedOn: -1 }); // Most recently updated first

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch tickets", error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("customer", "name email")
      .populate("notes.addedBy", "name role");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // // Ensure customers can only access their own tickets
    // if (req.user.role === "customer" && ticket.customer.toString() !== req.user.id.toString()) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch ticket", error: error.message });
  }
};

// Update ticket status
const updateTicket = async (req, res) => {
  const { status } = req.body;

  if (!["Active", "Pending", "Closed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    ticket.lastUpdatedOn = Date.now();
    await ticket.save();

    res.json({ message: "Ticket status updated", ticket });
  } catch (error) {
    res.status(500).json({ message: "Unable to update ticket", error: error.message });
  }
};

const addNoteToTicket = async (req, res) => {
  try {
    const { note } = req.body;
    const { id } = req.params; // Ticket ID
    const attachment = req.file ? req.file.path : null; // Uploaded file path

    if (!note) {
      return res.status(400).json({ message: "Note content is required" });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const newNote = {
      note,
      addedBy: req.user.id,
      addedAt: Date.now(),
      attachment, // Include the attachment
    };

    ticket.notes.push(newNote);
    ticket.lastUpdatedOn = Date.now(); // Update last updated time
    await ticket.save();

    res.json({ message: "Note added successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Unable to add note", error: error.message });
  }
};

const userTickets = async (req, res) => {
  try {
    // Fetch tickets where the customer matches the logged-in user's ID
    const tickets = await Ticket.find({ customer: req.user._id }).sort({ createdAt: -1 });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found for this user" });
    }

    res.status(200).json({
      message: "Tickets fetched successfully",
      tickets: tickets.map((ticket) => ({
        id: ticket._id,
        title: ticket.title,
        status: ticket.status,
        lastUpdatedOn: ticket.lastUpdatedOn,
        createdAt: ticket.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ message: "Error in userTickets", error: error.message });
  }
};


module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  addNoteToTicket,
  userTickets,
};
