const Ticket = require("../models/Ticket")
const User = require("../models/User")

const getDashboardData = async (req, res) => {
    try {
      const totalTickets = await Ticket.countDocuments();
      const totalCustomers = await User.countDocuments({ role: "customer" });
  
      res.json({ totalTickets, totalCustomers });
    } catch (error) {
      res.status(500).json({ message: "Unable to fetch dashboard data", error: error.message });
    }
  };
  
module.exports = {getDashboardData};