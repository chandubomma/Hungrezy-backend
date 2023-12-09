// models/User.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  // Your existing user schema fields
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
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Add a method to the schema for updating user details
userSchema.methods.updateDetails = async function (updates) {
  Object.assign(this, updates);
  await this.save();
};

const User = model("User", userSchema);

export default User;
