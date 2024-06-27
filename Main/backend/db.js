import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI ="mongodb+srv://kashyaphemantk:oVtfXWIuFyu84Coo@teamevent05.bhgtzn8.mongodb.net/?retryWrites=true&w=majority&appName=Teamevent05";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongo;
