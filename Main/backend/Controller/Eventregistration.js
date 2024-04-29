import Participant from '../models/Participant.js'; // Import Participant model
import Event from '../models/Event.js';



const Eventregistration = async (req, res) => {
  try {
    // Extract event details from the request body
    const { eventName, email, transactionId, status, participants } = req.body;

    const eventname = eventName;
    // Check if participants is an array
    if (!Array.isArray(participants)) {
      throw new Error('Participants should be an array.');
    }

    // Create a participant document
    const participantDoc = new Participant({
      eventName,
      email,
      transactionId,
      status,
      participants: participants.map(participant => ({
        name: participant.name,
        email: participant.email,
        contact: participant.contact,
        branch: participant.branch,
        sem: participant.sem
      }))
    });

    // Save the participant document to the database
    await participantDoc.save();

    const event = await Event.findOne({ eventname });
    if (!event) {
      throw new Error('Event not found.');
    }

    // Check if the event still has available entries
    if (event.entries <= 0) {
      throw new Error('No available entries for this event.');
    }

    // Decrement the available entries for the event
    event.entries -= 1;
    await event.save();
    
    // Send a success response back to the client
    res.status(200).send({ message: 'Participant details saved successfully.' });
  } catch (error) {
    // If an error occurs, send an error response back to the client
    console.error('Error saving participant details:', error);
    res.status(500).json({ message: 'Failed to save participant details.' });
  }
};

export default Eventregistration;
