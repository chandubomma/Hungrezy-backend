import { Schema, model } from "mongoose";

const userSchema = new Schema({
  mobileNumber: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  imageId: {
    type: String,
  } 
},{
  timestamps: true
});


const User = model("User", userSchema);

export default User;
