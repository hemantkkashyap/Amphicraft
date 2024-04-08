import React from 'react'
import Participant from '../models/Participant.js'; // Import Participant model

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
