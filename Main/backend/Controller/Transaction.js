import React from 'react'
import Participant from '../models/Participant.js'; // Import Participant model
import rateLimit from "express-rate-limit";

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});


const Transactions = async (req, res) => {
    try {
        const { email } = req.body; // Retrieve email from query parameters
        console.log("Email:", email);
        // Find all participants with the provided email and status "success"
        const transactions = await Participant.find({
          "participants.email": email,
          "status": "success"
        });
    
        console.log("123");
    
        if (transactions.length === 0) {
          return res.status(404).json({ message: "No transactions found for the provided email" });
        }
    
        // Extract event names and status from transactions
        const transactionDetails = transactions.map(participant => {
          const { eventName, status } = participant;
          return { eventName, status };
        });
    
        res.json({ transactions: transactionDetails });
      } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}

export default Transactions
