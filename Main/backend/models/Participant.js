import mongoose from "mongoose";
const { Schema } = mongoose;

const ParticipantSchema = new Schema({
  eventName: { type: String, required: true },
  email: { type: String, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, required: true },
  participants: [
    {
      name: { type: String },
      email: { type: String },
      contact: { type: String}
    }
  ]
});

const Participant = mongoose.model("Participant", ParticipantSchema);

export default Participant;
