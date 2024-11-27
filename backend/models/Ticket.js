const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: 
    { 
       type: String, 
       required: true 
    },

    status: 
    { 
      type: String, 
      enum: ["Active", "Pending", "Closed"], 
      default: "Active" 
    },
    
    customer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, 

    lastUpdatedOn: 
    { 
      type: Date, 
      default: Date.now 
    },

    notes: [
      {
        note: { type: String, required: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
        addedAt: { type: Date, default: Date.now },
        attachment: { type: String }, // New field for attachments
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
