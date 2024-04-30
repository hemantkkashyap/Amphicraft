import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  enrollment: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  contactno: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false, // By default, users are not admins
  },
  isSubAdmin: {
    type: Boolean,
    default: false, // By default, users are not admins
  }
}, { capped: { size: 100000, max: 20 } });

const User = mongoose.model("user", UserSchema);
User.createIndexes();
export default User;
