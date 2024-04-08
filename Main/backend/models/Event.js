import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
  eventname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Indoor', 'Outdoor', 'Tech', 'Cultural'], // Define the categories
    required: true
  },
  eventid: {
    type: String,  
  },
  eventdate: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  eventheading: {
    type: String,
    required: true
  },
  eventdetail: {
    type: String,
    required: true
  },
  coordinator1: {
    type: String,
    required: true
  },
  coordinator2: {
    type: String,
    required: true
  },
  entries: {
    type: Number,
    required:true
  },
  publisher: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required:true
  },
  minparticipent: {
    type: Number,
    required:true
  },
  maxparticipent: {
    type: Number,
    required:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to generate eventId based on category
EventSchema.pre('save', function(next) {
  const event = this;
  const eventIdPrefix = event.category.substring(0, 1).toUpperCase(); // Get the first letter of category in uppercase
  const randomId = Math.random().toString(36).substring(2, 10); // Generate random string for id
  event.eventid = `${eventIdPrefix}${randomId}`; // Concatenate prefix and random string
  console.log(event.eventid);
  next();
});

const Event = mongoose.model("Event", EventSchema);
Event.createIndexes();

export default Event;
