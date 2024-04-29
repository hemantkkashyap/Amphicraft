import React from 'react'
import Participant from '../models/Participant.js'; // Import Participant model

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);


const Registerdevent = async (req, res) => {
  try {
    
    const { email } = req.body;
    const participants = await Participant.find();

    // Initialize an array to store event names for the specified email
    const eventNames = [];

    // Iterate over the participants and check if the email exists
    participants.forEach(participant => {
        const foundParticipant = participant.participants.find(p => p.email === email && participant.status === "success");
        if (foundParticipant) {
          eventNames.push(participant.eventName);
        }
      });

    res.json({ events: eventNames });
  } catch (error) {
    console.error("Error fetching registered events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default Registerdevent
