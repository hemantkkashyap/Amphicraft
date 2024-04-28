import mongoose from 'mongoose';

const mongoURI = "mongodb://localhost:27017/teamevent?readPreference=primary&tls=false&directConnection=true";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongo;
