import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI =process.env.DB_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongo;
