import mongoose from 'mongoose';

const { Schema } = mongoose;

const UpdationSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      useremail: {
        type: String,
        required: true,
      },
      eventname: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
});

const Updation = mongoose.model("updation", UpdationSchema);
Updation.createIndexes();
export default Updation;